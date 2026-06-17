import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  withCredentials: true, // Send cookies (refresh token)
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest", // Helps distinguish AJAX from browser navigation
  },
});

// Request interceptor — attach fresh CSRF token on mutating requests
api.interceptors.request.use((config) => {
  if (["post", "put", "patch", "delete"].includes(config.method || "")) {
    const csrfToken = document.cookie
      .split("; ")
      .find((c) => c.startsWith("csrf_token="))
      ?.split("=")[1];
    if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

// Response interceptor — handle 401 with token refresh
let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: any) => void; reject: (e: any) => void }> = [];

function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => error ? reject(error) : resolve(token));
  failedQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then((token) => { original.headers["Authorization"] = `Bearer ${token}`; return api(original); });
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const { data } = await api.post("/auth/refresh");
        original.headers["Authorization"] = `Bearer ${data.access_token}`;
        processQueue(null, data.access_token);
        return api(original);
      } catch (e) {
        processQueue(e as Error, null);
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
