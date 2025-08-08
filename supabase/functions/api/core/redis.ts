// supabase/functions/api/core/redis.ts
import { Redis } from "https://deno.land/x/upstash_redis@v1.28.4/mod.ts";

export const redis = Deno.env.get("UPSTASH_REDIS_REST_URL") && Deno.env.get("UPSTASH_REDIS_REST_TOKEN")
  ? new Redis({ url: Deno.env.get("UPSTASH_REDIS_REST_URL")!, token: Deno.env.get("UPSTASH_REDIS_REST_TOKEN")! })
  : null;
