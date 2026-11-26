import { getAuthCookieName } from "../utils/jwt.js";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/**
 * Extracts normalized origin (protocol + host) from a URL string.
 */
function normalizeOrigin(urlStr) {
  if (!urlStr) return null;
  try {
    return new URL(urlStr).origin;
  } catch {
    return null;
  }
}

/**
 * CSRF protection middleware for cookie-authenticated state-changing requests.
 * Validates Sec-Fetch-Site, Origin, and Referer headers against CLIENT_URL
 * whenever an authentication cookie is present on non-idempotent methods.
 */
export function csrfProtection(req, res, next) {
  if (SAFE_METHODS.has(req.method)) {
    return next();
  }

  const cookieName = getAuthCookieName();
  const hasAuthCookie = Boolean(req.cookies && req.cookies[cookieName]);

  if (!hasAuthCookie) {
    return next();
  }

  const allowedOrigin = normalizeOrigin(process.env.CLIENT_URL || "http://localhost:5173");
  const secFetchSite = req.headers["sec-fetch-site"];
  const requestOrigin = normalizeOrigin(req.headers.origin);
  const refererOrigin = normalizeOrigin(req.headers.referer);

  if (secFetchSite === "cross-site") {
    return res.status(403).json({
      success: false,
      error: {
        code: "CSRF_FORBIDDEN",
        message: "Cross-site state-changing request blocked."
      }
    });
  }

  if (requestOrigin && requestOrigin !== allowedOrigin) {
    return res.status(403).json({
      success: false,
      error: {
        code: "CSRF_FORBIDDEN",
        message: "Invalid request origin."
      }
    });
  }

  if (!requestOrigin && refererOrigin && refererOrigin !== allowedOrigin) {
    return res.status(403).json({
      success: false,
      error: {
        code: "CSRF_FORBIDDEN",
        message: "Invalid request referer."
      }
    });
  }

  return next();
}

