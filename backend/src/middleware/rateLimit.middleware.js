import rateLimit from "express-rate-limit";

/**
 * Creates a rate limiter for authentication endpoints.
 * Configurable via environment variables for testing and production tuning.
 */
export function createAuthRateLimiter() {
  const windowMs = parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS || String(15 * 60 * 1000), 10);
  const max = parseInt(process.env.AUTH_RATE_LIMIT_MAX || "20", 10);

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many authentication attempts. Please try again later."
        }
      });
    }
  });
}

export const authRateLimiter = createAuthRateLimiter();

