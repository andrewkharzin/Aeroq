// supabase/functions/api/core/broker.ts
type PublishOpts = {
  delaySec?: number;        // optional delay
  notBeforeISO?: string;    // optional RFC3339 not-before
  headers?: Record<string, string>; // extra headers
};

const QSTASH_TOKEN = Deno.env.get("QSTASH_TOKEN")!;
const COMMAND_HANDLER_URL = Deno.env.get("COMMAND_HANDLER_URL")!; // worker endpoint

export async function publishCommand(message: unknown, opts: PublishOpts = {}) {
  const url = `https://qstash.upstash.io/v2/publish/${encodeURIComponent(COMMAND_HANDLER_URL)}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${QSTASH_TOKEN}`,
    "Content-Type": "application/json",
    ...(opts.headers ?? {}),
  };
  if (opts.delaySec && opts.delaySec > 0) headers["Upstash-Delay"] = `${opts.delaySec}s`;
  if (opts.notBeforeISO) headers["Upstash-Not-Before"] = opts.notBeforeISO;

  const resp = await fetch(url, { method: "POST", headers, body: JSON.stringify(message) });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Response(`Broker publish failed: ${text}`, { status: 502 });
  }
}
