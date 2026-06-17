import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api";

interface User {
  id: string;
  email: string;
  display_name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  isAuthenticated: () => boolean;
}

// ⚠️ Access token stored in memory only — NOT localStorage (XSS safe)
// Refresh token is httpOnly cookie (managed by server, JS-inaccessible)
let _accessToken: string | null = null;

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,

      isAuthenticated: () => !!_accessToken,

      login: async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        _accessToken = data.access_token;
        api.defaults.headers.common["Authorization"] = `Bearer ${_accessToken}`;
        set({ user: data.user, accessToken: "[set]" }); // Never persist raw token
      },

      logout: async () => {
        try { await api.post("/auth/logout"); } catch (_) {}
        _accessToken = null;
        delete api.defaults.headers.common["Authorization"];
        set({ user: null, accessToken: null });
      },

      refresh: async () => {
        const { data } = await api.post("/auth/refresh");
        _accessToken = data.access_token;
        api.defaults.headers.common["Authorization"] = `Bearer ${_accessToken}`;
      },
    }),
    {
      name: "auth-store",
      // Only persist non-sensitive user info — NEVER the token
      partialize: (state) => ({ user: state.user }),
    }
  )
);

// Auto-refresh access token 1 minute before expiry
export function setupTokenRefresh(refreshFn: () => Promise<void>) {
  // Access tokens expire in 15min — refresh every 14min
  const INTERVAL = 14 * 60 * 1000;
  return setInterval(async () => {
    try { await refreshFn(); }
    catch { /* Refresh failed — user will be asked to log in */ }
  }, INTERVAL);
}
