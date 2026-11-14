/**
 * Centralized Not Found (404) Middleware
 * Catches all requests to unhandled routes and returns a structured JSON response.
 */
export function notFoundMiddleware(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Resource not found: ${req.method} ${req.originalUrl}`
    }
  });
}

