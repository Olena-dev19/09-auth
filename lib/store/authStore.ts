import { User } from "@/types/user";
import { create } from "zustand";
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}
export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ isAuthenticated: true, user }),
  clearIsAuthenticated: () => set({ isAuthenticated: false, user: null }),
}));
