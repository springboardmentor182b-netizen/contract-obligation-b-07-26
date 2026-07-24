import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../utils/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.login({
        email: formData.email,
        password: formData.password
      });
      
      // Store the JWT token
      api.setToken(response.access_token);
      
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input 
          type="password" 
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <hr />

      <button className="google-btn" onClick={() => api.googleLogin()}>
        Continue with Google
      </button>

      <button className="facebook-btn" onClick={() => api.facebookLogin()}>
        Continue with Facebook
      </button>

      <button className="github-btn" onClick={() => api.githubLogin()}>
        Continue with GitHub
      </button>

      <button className="apple-btn" onClick={() => api.appleLogin()}>
        Continue with Apple
      </button>

      <br /><br />

      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <p>
        Don't have an account?{" "}
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;