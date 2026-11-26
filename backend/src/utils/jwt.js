import jwt from "jsonwebtoken";

const DEFAULT_EXPIRES_IN = "7d";
const DEFAULT_COOKIE_NAME = "researchai_token";

/**
 * Retrieves JWT secret from environment variables.
 * Throws explicitly if missing so secrets are never hardcoded.
 */
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not configured.");
  }
  return secret;
}

export function getAuthCookieName() {
  return process.env.AUTH_COOKIE_NAME || DEFAULT_COOKIE_NAME;
}

/**
 * Parses a duration string (e.g. "7d", "24h", "30m") into milliseconds for cookie maxAge.
 */
function parseDurationToMs(durationStr) {
  if (!durationStr) return 7 * 24 * 60 * 60 * 1000;
  const match = String(durationStr).trim().match(/^(\d+)([smhd])$/i);
  if (!match) return 7 * 24 * 60 * 60 * 1000;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };
  return value * multipliers[unit];
}

/**
 * Signs a JWT for an authenticated user.
 * @param {{ _id: any, role: string }} user
 * @returns {string}
 */
export function signAuthToken(user) {
  const secret = getJwtSecret();
  const expiresIn = process.env.JWT_EXPIRES_IN || DEFAULT_EXPIRES_IN;

  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role || "user"
    },
    secret,
    { expiresIn }
  );
}

/**
 * Verifies a JWT and returns its decoded payload.
 * @param {string} token
 * @returns {object}
 */
export function verifyAuthToken(token) {
  const secret = getJwtSecret();
  return jwt.verify(token, secret);
}

/**
 * Builds consistent HttpOnly cookie options for login/register and logout clearing.
 */
export function getAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";
  const sameSite = (process.env.COOKIE_SAME_SITE || "lax").toLowerCase();
  const explicitSecure = process.env.COOKIE_SECURE
    ? process.env.COOKIE_SECURE === "true"
    : isProduction;
  // Browsers require Secure=true whenever SameSite=None
  const secure = sameSite === "none" ? true : explicitSecure;
  const maxAge = parseDurationToMs(process.env.JWT_EXPIRES_IN || DEFAULT_EXPIRES_IN);

  return {
    httpOnly: true,
    secure,
    sameSite,
    path: "/",
    maxAge
  };
}

export function setAuthCookie(res, token) {
  res.cookie(getAuthCookieName(), token, getAuthCookieOptions());
}

export function clearAuthCookie(res) {
  const { maxAge: _maxAge, ...clearOptions } = getAuthCookieOptions();
  res.clearCookie(getAuthCookieName(), clearOptions);
}

