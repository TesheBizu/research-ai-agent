import bcrypt from "bcryptjs";
import User from "../models/User.js";
import {
  clearAuthCookie,
  setAuthCookie,
  signAuthToken
} from "../utils/jwt.js";
import {
  validateLoginInput,
  validateRegistrationInput
} from "../utils/validation.js";

const BCRYPT_SALT_ROUNDS = 12;

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account and issue HttpOnly JWT cookie
 * @access  Public
 */
export async function register(req, res, next) {
  try {
    const { isValid, errors, data } = validateRegistrationInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: errors[0].message,
          details: errors
        }
      });
    }

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          code: "EMAIL_ALREADY_EXISTS",
          message: "An account with this email already exists."
        }
      });
    }

    const passwordHash = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS);

    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash
    });

    const token = signAuthToken(user);
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      data: {
        user: user.toSafeObject()
      }
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({
        success: false,
        error: {
          code: "EMAIL_ALREADY_EXISTS",
          message: "An account with this email already exists."
        }
      });
    }
    return next(err);
  }
}

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user credentials and issue HttpOnly JWT cookie
 * @access  Public
 */
export async function login(req, res, next) {
  try {
    const { isValid, errors, data } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: errors[0].message,
          details: errors
        }
      });
    }

    const user = await User.findOne({ email: data.email }).select("+passwordHash");
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password."
        }
      });
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password."
        }
      });
    }

    const token = signAuthToken(user);
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      data: {
        user: user.toSafeObject()
      }
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * @route   POST /api/auth/logout
 * @desc    Clear authentication cookie and log out user
 * @access  Public / Authenticated
 */
export function logout(_req, res) {
  clearAuthCookie(res);
  return res.status(200).json({
    success: true,
    message: "Logged out successfully."
  });
}

/**
 * @route   GET /api/auth/me
 * @desc    Return currently authenticated user's safe profile
 * @access  Private
 */
export function getCurrentUser(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      user: req.user
    }
  });
}

