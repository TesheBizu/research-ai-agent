import mongoose from "mongoose";

/**
 * Sanitizes a MongoDB connection URI for safe logging without exposing credentials.
 * @param {string} uri - The connection URI.
 * @returns {string} - The sanitized URI with masked credentials.
 */
export function sanitizeMongoUri(uri) {
  if (!uri || typeof uri !== "string") return "";
  try {
    return uri.replace(/\/\/[^:]+:[^@]+@/, "//***:***@");
  } catch {
    return "[unparseable URI]";
  }
}

/**
 * Connection state human-readable mapping for Mongoose readyState.
 * readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
 */
const CONNECTION_STATES = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting"
};

/**
 * Retrieves the current database status.
 * @returns {{ state: string, readyState: number, isConnected: boolean }}
 */
export function getDatabaseStatus() {
  const readyState = mongoose.connection.readyState;
  return {
    state: CONNECTION_STATES[readyState] || "unknown",
    readyState,
    isConnected: readyState === 1
  };
}

/**
 * Checks whether MongoDB is actively connected and ready.
 * @returns {boolean}
 */
export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

/**
 * Establishes connection to MongoDB via Mongoose.
 * @param {string} [customUri] - Optional override URI for testing.
 * @returns {Promise<boolean>} - Resolves to true if connected, false otherwise.
 */
export async function connectDatabase(customUri) {
  const uri = customUri || process.env.MONGODB_URI;

  if (!uri) {
    console.error("[Database] MONGODB_URI is not defined in environment variables.");
    return false;
  }

  const sanitizedUri = sanitizeMongoUri(uri);

  // Setup connection event listeners
  mongoose.connection.on("connected", () => {
    console.log(`[Database] MongoDB connected successfully to ${sanitizedUri}`);
  });

  mongoose.connection.on("error", (err) => {
    console.error(`[Database] MongoDB connection error: ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[Database] MongoDB disconnected unexpectedly.");
  });

  try {
    console.log(`[Database] Attempting connection to ${sanitizedUri}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout for quick failure reporting if unavailable
    });
    return true;
  } catch (error) {
    console.error(`[Database] Failed to connect to MongoDB: ${error.message}`);
    return false;
  }
}

/**
 * Disconnects from MongoDB gracefully.
 * @returns {Promise<void>}
 */
export async function disconnectDatabase() {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("[Database] Disconnected from MongoDB.");
    }
  } catch (error) {
    console.error(`[Database] Error during disconnect: ${error.message}`);
  }
}

