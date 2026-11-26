import React, { createContext, useCallback, useEffect, useState } from "react";
import api, { setUnauthorizedHandler } from "../services/api.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/auth/me");
      setUser(response.data?.data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password });
    const authenticatedUser = response.data?.data?.user || null;
    setUser(authenticatedUser);
    return authenticatedUser;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const response = await api.post("/auth/register", { name, email, password });
    const authenticatedUser = response.data?.data?.user || null;
    setUser(authenticatedUser);
    return authenticatedUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Clear local auth state even if the network/logout call fails
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
    refreshSession: checkSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

