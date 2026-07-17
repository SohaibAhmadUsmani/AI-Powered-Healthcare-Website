import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export const useAuthActions = () => {
  const { login: setAuth, logout: clearAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (email, password, rememberMe = false) => {
      setIsLoading(true);
      try {
        const response = await api.post("/auth/login", { email, password, rememberMe });
        const { user, accessToken, refreshToken } = response.data.data;
        setAuth(user, accessToken, refreshToken);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message:
            error.response?.data?.message || "Login failed. Please try again.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth]
  );

  const signup = useCallback(
    async (fullName, email, password) => {
      setIsLoading(true);
      try {
        const response = await api.post("/auth/signup", {
          fullName,
          email,
          password,
        });
        const { user, accessToken, refreshToken } = response.data.data;
        setAuth(user, accessToken, refreshToken);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message:
            error.response?.data?.message ||
            "Signup failed. Please try again.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuth]);

  return { login, signup, logout, isLoading };
};
