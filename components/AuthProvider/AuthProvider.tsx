"use client";
import { useEffect } from "react";
import { useAuthStore } from "../../lib/store/authStore";
import { checkSession, getUser } from "@/lib/api/clientApi";

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchSession = async () => {
      const isActiveSession = await checkSession();
      if (isActiveSession.success) {
        const user = await getUser();
        if (user) {
          setUser(user);
        }
      } else {
        clearIsAuthenticated();
      }
    };
    fetchSession();
  }, [setUser, clearIsAuthenticated]);
  return children;
};

export default AuthProvider;
