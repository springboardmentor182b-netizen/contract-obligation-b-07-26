import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Legal Manager",
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
        localStorage.setItem("token", result.access_token);

        setMessage("Login Successful");
        setMessageType("success");

        setTimeout(() => {
          navigate("/loading");
        }, 1000);
      } else {
        setMessage(result.detail || "Invalid email or password");
        setMessageType("danger");
      }
    } catch {
      setMessage("Unable to connect to the server.");
      setMessageType("danger");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your ContractIQ workspace."
    >
      <form onSubmit={handleLogin}>

        {/* Email */}

        <label className="form-label fw-semibold">
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
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}

        <label className="form-label fw-semibold">
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

        {/* Role */}

        <label className="form-label fw-semibold">
          Role
        </label>

        <select
          className="form-select"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option>Administrator</option>
          <option>Legal Manager</option>
          <option>Compliance Officer</option>
          <option>Contract Manager</option>
          <option>Department Head</option>
          <option>Employee</option>
        </select>

        <small className="text-muted d-block mt-2 mb-3">
          Select your role to load role-specific permissions and dashboard.
        </small>

        {/* Remember */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
            />

            <label
              htmlFor="remember"
              className="form-check-label ms-2"
            >
              Remember me for 30 days
            </label>

          </div>

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

        </div>

        {/* Alert */}

        {message && (
          <div className={`alert alert-${messageType}`}>
            {message}
          </div>
        )}

        {/* Login */}

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 fw-semibold"
        >
          Sign in to ContractIQ
        </button>

        {/* Register */}

        <p className="text-center mt-4 mb-4">

          Don't have an account?

          <Link
            className="ms-2"
            to="/register"
          >
            Create Account
          </Link>

        </p>

        {/* Quick Role Access */}

        <hr />

        <div className="text-center">

          <small className="text-muted fw-bold">
            QUICK ROLE ACCESS (DEMO)
          </small>

          <div className="row mt-3 g-2">

            <div className="col-6">
              <button type="button" className="btn btn-outline-primary w-100">
                Administrator
              </button>
            </div>

            <div className="col-6">
              <button type="button" className="btn btn-outline-primary w-100">
                Legal Manager
              </button>
            </div>

            <div className="col-6">
              <button type="button" className="btn btn-outline-success w-100">
                Compliance Officer
              </button>
            </div>

            <div className="col-6">
              <button type="button" className="btn btn-outline-warning w-100">
                Contract Manager
              </button>
            </div>

            <div className="col-6">
              <button type="button" className="btn btn-outline-info w-100">
                Department Head
              </button>
            </div>

            <div className="col-6">
              <button type="button" className="btn btn-outline-secondary w-100">
                Employee
              </button>
            </div>

          </div>

        </div>

      </form>
    </AuthLayout>
  );
}

export default Login;