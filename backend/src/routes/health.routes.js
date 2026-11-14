import { Router } from "express";
import { getDatabaseStatus } from "../config/database.js";

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Liveness check reporting application and server status
 * @access  Public
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      application: "ResearchAI API",
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    }
  });
});

/**
 * @route   GET /api/health/ready
 * @desc    Readiness check reporting whether the application is ready to handle requests (MongoDB connection state)
 * @access  Public
 */
router.get("/ready", (req, res) => {
  const dbStatus = getDatabaseStatus();

  if (dbStatus.isConnected) {
    return res.status(200).json({
      success: true,
      data: {
        application: "ResearchAI API",
        status: "ready",
        database: {
          status: dbStatus.state,
          readyState: dbStatus.readyState
        },
        timestamp: new Date().toISOString()
      }
    });
  }

  // If MongoDB is not actively connected (0=disconnected, 2=connecting, 3=disconnecting)
  return res.status(503).json({
    success: false,
    data: {
      application: "ResearchAI API",
      status: "not_ready",
      database: {
        status: dbStatus.state,
        readyState: dbStatus.readyState
      },
      message: "Database connection is not ready.",
      timestamp: new Date().toISOString()
    }
  });
});

export default router;

