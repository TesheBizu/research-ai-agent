/**
 * Centralized Error Handling Middleware
 * Intercepts uncaught errors, standardizes response payload, and ensures safe error reporting.
 */
export function errorMiddleware(err, req, res, next) {
  const isProduction = process.env.NODE_ENV === "production";
  let statusCode = err.statusCode || err.status || 500;
  let errorCode = err.code || (statusCode === 500 ? "INTERNAL_SERVER_ERROR" : "REQUEST_ERROR");
  let details = err.details;

  if (err.name === "ValidationError") {
    statusCode = 400;
    errorCode = "VALIDATION_ERROR";
    details = Object.values(err.errors || {}).map((e) => ({
      field: e.path,
      message: e.message
    }));
  } else if (err.name === "CastError") {
    statusCode = 400;
    errorCode = "INVALID_ID";
  }

  // Avoid leaking sensitive internal messages or traces in production for internal server errors
  const message =
    isProduction && statusCode === 500
      ? "An unexpected internal server error occurred."
      : err.message || "An unexpected error occurred.";

  const errorResponse = {
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details && { details }),
      ...(!isProduction && err.stack && { stack: err.stack })
    }
  };

  // Log error details for server diagnostics
  if (statusCode >= 500) {
    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);
  } else {
    console.warn(`[Warning] ${req.method} ${req.originalUrl} (${statusCode}): ${err.message}`);
  }

  res.status(statusCode).json(errorResponse);
}

