import User from "../models/User.js";
import { getAuthCookieName, verifyAuthToken } from "../utils/jwt.js";

/**
 * Extracts JWT from HttpOnly cookie (primary) or Authorization Bearer header (fallback).
 */
function extractToken(req) {
  const cookieName = getAuthCookieName();
  if (req.cookies && req.cookies[cookieName]) {
    return req.cookies[cookieName];
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    return token || null;
  }

  return null;
}

/**
 * Reusable authentication middleware.
 * Rejects missing, invalid, or expired tokens with 401 Unauthorized.
 */
export async function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required."
        }
      });
    }

    let decoded;
    try {
      decoded = verifyAuthToken(token);
    } catch (err) {
      const isExpired = err.name === "TokenExpiredError";
      return res.status(401).json({
        success: false,
        error: {
          code: isExpired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
          message: isExpired
            ? "Authentication token has expired."
            : "Invalid authentication token."
        }
      });
    }

    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication token is no longer valid."
        }
      });
    }

    req.user = user.toSafeObject();
    return next();
  } catch (err) {
    return next(err);
  }
}

