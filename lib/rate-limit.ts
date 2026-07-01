import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;

function getLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) return null;

  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "flyprep:waitlist",
    });
  }

  return limiter;
}

export async function checkRateLimit(ip: string) {
  const ratelimit = getLimiter();

  if (!ratelimit) {
    return { success: true };
  }

  const { success } = await ratelimit.limit(ip);
  return { success };
}
