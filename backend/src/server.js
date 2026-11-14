import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from backend directory or fallback to current directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";

const PORT = parseInt(process.env.PORT || "5000", 10);
const NODE_ENV = process.env.NODE_ENV || "development";

// Start server
const server = app.listen(PORT, async () => {
  console.log(`[Server] ResearchAI Backend running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`[Server] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[Server] Readiness check: http://localhost:${PORT}/api/health/ready`);

  // Connect to MongoDB asynchronously without blocking server start
  await connectDatabase();
});

// Graceful shutdown handling
async function handleShutdown(signal) {
  console.log(`\n[Server] Received ${signal}. Initiating graceful shutdown...`);

  server.close(async () => {
    console.log("[Server] HTTP server closed.");
    await disconnectDatabase();
    console.log("[Server] Process exited gracefully.");
    process.exit(0);
  });

  // Force shutdown if cleanup takes longer than 10 seconds
  setTimeout(() => {
    console.error("[Server] Forced shutdown due to timeout.");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));

export default server;
