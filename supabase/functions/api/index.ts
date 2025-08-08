import { cors, respond, getRequestId } from "./core/http.ts";
import { supabaseForRequest, getAuthContext } from "./core/auth.ts";
import { parseQuery } from "./core/query.ts";
import { registry } from "./resourses/index.ts";
import { listRecords, getRecord, createRecord, updateRecord, deleteRecord } from "./core/crud.ts";
import { rateLimit } from "./core/rate_limit.ts";
import { ensureIdempotent } from "./core/idempotency.ts";
import { cacheGetOrSet } from "./core/cache.ts";
import { publishCommand } from "./core/broker.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return cors(req, new Response(null, { status: 204 }));
  const requestId = getRequestId(req);
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/|\/$/g, "");

  try {
    // simple per-key rate limit
    const apiKey = req.headers.get("X-Api-Key") ?? "public";
    await rateLimit(`api:${apiKey}`, 300, 60);

    if (!path || path === "health") return cors(req, respond({ ok: true }, { status: 200 }, requestId));

    // Commands (async)
    if (path.startsWith("v1/commands/") && req.method === "POST") {
      const name = path.substring("v1/commands/".length); // e.g. bookings.create
      const { tenantId, roles, userId } = await getAuthContext(req);
      const idem = await ensureIdempotent(req);
      if (idem.duplicate) return cors(req, respond(null, { status: 409 }, requestId, undefined, "Duplicate"));

      const payload = await req.json().catch(() => ({}));
      await publishCommand({ type: name, tenantId, userId, payload, correlationId: requestId });
      return cors(req, respond({ accepted: true, correlationId: requestId }, { status: 202 }, requestId));
    }

    // Resources
    if (!path.startsWith("v1/")) return cors(req, respond(null, { status: 404 }, requestId, undefined, "Not Found"));
    const [_, resourceName, maybeId] = path.split("/");
    const resource = registry[resourceName];
    if (!resource) return cors(req, respond(null, { status: 404 }, requestId, undefined, "Unknown resource"));

    const { svcClient } = supabaseForRequest(req);
    const { tenantId, roles } = await getAuthContext(req);
    const method = req.method;

    if (resource.rbac && !resource.rbac({ roles, method })) throw new Response("Forbidden", { status: 403 });

    if (method === "GET" && !maybeId && resource.allow?.list) {
      const q = parseQuery(url);
      const useCache = url.searchParams.get("cache") === "1";
      const key = `q:list:${resourceName}:${tenantId}:${url.searchParams.toString()}`;
      const payload = await (useCache
        ? cacheGetOrSet(key, () => listRecords(svcClient, resource, tenantId, q), 20)
        : listRecords(svcClient, resource, tenantId, q));
      return cors(req, respond(payload.data, { status: 200 }, requestId, payload.meta));
    }

    if (method === "GET" && maybeId && resource.allow?.get) {
      const q = parseQuery(url);
      const useCache = url.searchParams.get("cache") === "1";
      const key = `q:get:${resourceName}:${tenantId}:${maybeId}:${q.fields.join(",")}:${q.include.join(",")}`;
      const data = await (useCache
        ? cacheGetOrSet(key, () => getRecord(svcClient, resource, tenantId, maybeId, q.fields, q.include), 30)
        : getRecord(svcClient, resource, tenantId, maybeId, q.fields, q.include));
      return cors(req, respond(data, { status: 200 }, requestId));
    }

    if (method === "POST" && resource.allow?.create) {
      const idem = await ensureIdempotent(req);
      if (idem.duplicate) return cors(req, respond(null, { status: 409 }, requestId, undefined, "Duplicate"));
      const body = await req.json().catch(() => ({}));
      const data = await createRecord(svcClient, resource, tenantId, body);
      return cors(req, respond(data, { status: 201 }, requestId));
    }

    if (method === "PATCH" && maybeId && resource.allow?.update) {
      const body = await req.json().catch(() => ({}));
      const data = await updateRecord(svcClient, resource, tenantId, maybeId, body);
      return cors(req, respond(data, { status: 200 }, requestId));
    }

    if (method === "DELETE" && maybeId && resource.allow?.delete) {
      await deleteRecord(svcClient, resource, tenantId, maybeId);
      return cors(req, respond({ deleted: true }, { status: 200 }, requestId));
    }

    return cors(req, respond(null, { status: 405 }, requestId, undefined, "Method Not Allowed"));
  } catch (err) {
    if (err instanceof Response) return cors(req, err);
    return cors(req, respond(null, { status: 500 }, requestId, undefined, "Internal Server Error"));
  }
});
