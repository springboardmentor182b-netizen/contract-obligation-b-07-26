import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("danger");
      return;
    }

    // Password Length Validation
    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters");
      setMessageType("danger");
      return;
    }

    try {
      const result = await registerUser({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      if (result.message) {
        setMessage(result.message);
        setMessageType("success");

        setFormData({
          full_name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else if (result.detail) {
        setMessage(result.detail);
        setMessageType("danger");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setMessageType("danger");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "450px" }}
      >
        <h2 className="text-center fw-bold">Create Account</h2>

        <p className="text-center text-muted mb-4">
          Register to continue
        </p>

        <form onSubmit={handleRegister}>
          <label className="form-label">Full Name</label>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaUser />
            </span>

            <input
              type="text"
              name="full_name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <label className="form-label">Email Address</label>

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

          <label className="form-label">Password</label>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaLock />
            </span>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Create password"
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

          <label className="form-label">Confirm Password</label>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaLock />
            </span>

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {message && (
            <div className={`alert alert-${messageType}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Register
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;