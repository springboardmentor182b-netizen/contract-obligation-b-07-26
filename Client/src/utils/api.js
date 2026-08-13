const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  async signup(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Signup failed");
    }

    return response.json();
  },

  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    return response.json();
  },

  getToken() {
    return localStorage.getItem("token");
  },

  setToken(token) {
    localStorage.setItem("token", token);
  },

  removeToken() {
    localStorage.removeItem("token");
  },

  async getMe() {
    const token = this.getToken();

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to get user");
    }

    return response.json();
  },

  googleLogin() {
    window.location.href = `${API_BASE_URL}/auth/google/login`;
  },

  facebookLogin() {
    window.location.href = `${API_BASE_URL}/auth/facebook/login`;
  },

  githubLogin() {
    window.location.href = `${API_BASE_URL}/auth/github/login`;
  },

  appleLogin() {
    window.location.href = `${API_BASE_URL}/auth/apple/login`;
  },
};