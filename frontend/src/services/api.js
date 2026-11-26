import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

let unauthorizedHandler = null;

/**
 * Registers a callback invoked when an API request returns 401 Unauthorized
 * (excluding initial session check and login/register attempts).
 */
export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || "";

    const isAuthEndpoint =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/me") ||
      requestUrl.includes("/auth/logout");

    if (status === 401 && !isAuthEndpoint && typeof unauthorizedHandler === "function") {
      unauthorizedHandler();
    }

    return Promise.reject(error);
  }
);

/**
 * Extracts a safe, user-facing error message from an Axios error response.
 */
export function extractApiErrorMessage(error, fallbackMessage = "Something went wrong. Please try again.") {
  return error?.response?.data?.error?.message || fallbackMessage;
}

export default api;
