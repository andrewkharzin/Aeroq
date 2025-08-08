// supabase/functions/api/core/cache.ts
import { redis } from "./redis.ts";

export async function cacheGetOrSet<T>(key: string, producer: () => Promise<T>, ttlSec = 30): Promise<T> {
  if (!redis) return await producer();
  const cached = await redis.get<string>(key);
  if (cached) return JSON.parse(cached) as T;
  const value = await producer();
  await redis.set(key, JSON.stringify(value), { ex: ttlSec });
  return value;
}
