import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";
let loginRequest;

const api = axios.create({ baseURL, headers: { "Content-Type": "application/json" } });

async function getToken() {
  const stored = localStorage.getItem("token");
  if (stored) return stored;
  loginRequest ??= axios.post(`${baseURL}/auth/login`, { email: "admin@contractiq.local", password: "Admin@123" })
    .then(({ data }) => { localStorage.setItem("token", data.access_token); return data.access_token; })
    .finally(() => { loginRequest = undefined; });
  return loginRequest;
}

function clearToken() {
  localStorage.removeItem("token");
  loginRequest = undefined;
}

api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await getToken()}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    if (error.response?.status !== 401 || request?._retried) return Promise.reject(error);

    request._retried = true;
    clearToken();
    request.headers.Authorization = `Bearer ${await getToken()}`;
    return api(request);
  },
);

export default api;
