import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const limiters = new Map<string, Ratelimit>();

function getLimiter(limit: number, windowMs: number): Ratelimit {
  const key = `${limit}:${windowMs}`;
  if (!limiters.has(key)) {
    limiters.set(
      key,
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${Math.ceil(windowMs / 1000)} s`),
      }),
    );
  }
  return limiters.get(key)!;
}

export async function rateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const { success } = await getLimiter(limit, windowMs).limit(key);
  return success;
}
