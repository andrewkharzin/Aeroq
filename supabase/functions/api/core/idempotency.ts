// supabase/functions/api/core/idempotency.ts
import { redis } from "./redis.ts";

export async function ensureIdempotent(req: Request, ttlSec = 600) {
  if (!redis) return { duplicate: false };
  const key = req.headers.get("Idempotency-Key");
  if (!key) return { duplicate: false };
  const ok = await redis.set(`idem:${key}`, "1", { nx: true, ex: ttlSec });
  return { duplicate: ok === null };
}
