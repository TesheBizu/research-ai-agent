import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { csrfProtection } from "./middleware/csrf.middleware.js";
import { notFoundMiddleware } from "./middleware/notFound.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// Security HTTP headers
app.use(helmet());

// Cross-Origin Resource Sharing (CORS) configured via CLIENT_URL
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin(requestOrigin, callback) {
      if (!requestOrigin || requestOrigin === clientUrl) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// HTTP request logger
const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(morganFormat));

// Body and cookie parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(csrfProtection);

// Route registrations
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

// Centralized 404 handler for unknown routes
app.use(notFoundMiddleware);

// Centralized error handler
app.use(errorMiddleware);

export default app;

