// supabase/functions/api/core/http.ts
export function cors(req: Request, res: Response) {
  const origin = req.headers.get('Origin') ?? '*'
  const h = new Headers(res.headers)
  h.set('Access-Control-Allow-Origin', origin)
  h.set('Vary', 'Origin')
  h.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Idempotency-Key, X-Request-Id')
  h.set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  return new Response(res.body, { ...res, headers: h })
}

export function respond(data: unknown, init: ResponseInit = {}, requestId?: string, meta?: unknown, error?: unknown) {
  const body = { data: error ? null : data, error: error ? String(error) : null, meta: meta ?? null, requestId }
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) }
  })
}

export function getRequestId(req: Request) {
  return req.headers.get('X-Request-Id') ?? crypto.randomUUID()
}
