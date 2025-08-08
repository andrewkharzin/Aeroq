// supabase/functions/api/core/rate_limit.ts
import { redis } from "./redis.ts";

export async function rateLimit(bucket: string, limit: number, windowSec: number) {
  if (!redis) return;
  const window = Math.floor(Date.now() / 1000 / windowSec);
  const key = `rl:${bucket}:${window}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSec);
  if (count > limit) throw new Response("Too Many Requests", { status: 429, headers: { "Retry-After": String(windowSec) } });
}
