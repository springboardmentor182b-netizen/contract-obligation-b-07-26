import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(formData);

      if (result.access_token) {
        // Save JWT Token
        localStorage.setItem("token", result.access_token);

        setMessage("Login Successful");
        setMessageType("success");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

      } else if (result.detail) {
        setMessage(result.detail);
        setMessageType("danger");
      }

    } catch (error) {
      setMessage("Something went wrong.");
      setMessageType("danger");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "430px" }}
      >
        <h2 className="text-center fw-bold">
          Welcome Back
        </h2>

        <p className="text-center text-muted mb-4">
          Sign in to your account
        </p>

        <form onSubmit={handleLogin}>

          <label className="form-label">
            Email Address
          </label>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaEnvelope />
            </span>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label className="form-label">
            Password
          </label>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaLock />
            </span>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <input type="checkbox" className="me-2" />
              Remember Me
            </div>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          {message && (
            <div className={`alert alert-${messageType}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;