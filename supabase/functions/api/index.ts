import { cors, respond, getRequestId } from "./core/http.ts";
import { supabaseForRequest, getAuthContext } from "./core/auth.ts";
import { parseQuery } from "./core/query.ts";
import { listRecords, getRecord, createRecord, updateRecord, deleteRecord } from "./core/crud.ts";
import { registry } from "./resourses/index.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return cors(req, new Response(null, { status: 204 }));
  const requestId = getRequestId(req);
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/|\/$/g, "");

  try {
    if (path === "" || path === "health") return cors(req, respond({ ok: true }, { status: 200 }, requestId));
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
      const payload = await listRecords(svcClient, resource, tenantId, q);
      return cors(req, respond(payload.data, { status: 200 }, requestId, payload.meta));
    }

    if (method === "GET" && maybeId && resource.allow?.get) {
      const q = parseQuery(url);
      const data = await getRecord(svcClient, resource, tenantId, maybeId, q.fields, q.include);
      return cors(req, respond(data, { status: 200 }, requestId));
    }

    if (method === "POST" && resource.allow?.create) {
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
