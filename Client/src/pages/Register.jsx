import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] =
    useState("");

  const [formData, setFormData] = useState({

    organization: "",

    firstName: "",

    lastName: "",

    email: "",

    phone: "",

    department: "",

    role: "",

    password: "",

    confirmPassword: "",

    agree: false,

  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  const handleRegister = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {

      setMessage("Passwords do not match.");

      setMessageType("danger");

      return;

    }

    try {

      const result = await registerUser({

        full_name:
          formData.firstName + " " + formData.lastName,

        email: formData.email,

        password: formData.password,

      });

      if (result.id) {

        setMessage("Registration Successful!");

        setMessageType("success");

        setTimeout(() => {

          navigate("/");

        }, 1500);

      } else {

        setMessage(result.detail || "Registration Failed");

        setMessageType("danger");

      }

    } catch {

      setMessage("Something went wrong.");

      setMessageType("danger");

    }

  };

  return (

    <AuthLayout
      title="Create your account"
      subtitle="Fill in the details below to request platform access."
    >

      <Link
        to="/"
        className="text-decoration-none small"
      >
        <FaArrowLeft className="me-2" />
        Back to sign in
      </Link>

      <form
        className="mt-4"
        onSubmit={handleRegister}
      >

        <h6 className="text-uppercase text-muted mb-4">
          Organization Details
        </h6>

        <label className="form-label fw-semibold">
          Organization Name
        </label>

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaBuilding />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Acme Corporation"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          />

        </div>

        <div className="row">

          <div className="col-md-6">

            <label className="form-label fw-semibold">
              First Name
            </label>

            <div className="input-group mb-3">

              <span className="input-group-text">
                <FaUser />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Sarah"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="col-md-6">

            <label className="form-label fw-semibold">
              Last Name
            </label>

            <div className="input-group mb-3">

              <span className="input-group-text">
                <FaUser />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Chen"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

            </div>

          </div>

        </div>

        <label className="form-label fw-semibold">
          Company Email
        </label>

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaEnvelope />
          </span>

          <input
            type="email"
            className="form-control"
            placeholder="name@company.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

        </div>

        <label className="form-label fw-semibold">
          Phone Number
        </label>

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaPhone />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="+91 9876543210"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

        </div>
                <div className="row">

          <div className="col-md-6">

            <label className="form-label fw-semibold">
              Department
            </label>

            <select
              className="form-select mb-3"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Department
              </option>

              <option>Legal</option>
              <option>Compliance</option>
              <option>Finance</option>
              <option>Human Resources</option>
              <option>Operations</option>

            </select>

          </div>

          <div className="col-md-6">

            <label className="form-label fw-semibold">
              Role
            </label>

            <select
              className="form-select mb-3"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Role
              </option>

              <option>Administrator</option>
              <option>Legal Manager</option>
              <option>Compliance Officer</option>
              <option>Department Head</option>
              <option>Employee</option>
              <option>Viewer</option>

            </select>

          </div>

        </div>

        <h6 className="text-uppercase text-muted mt-4 mb-4">
          Security
        </h6>

        <label className="form-label fw-semibold">
          Password
        </label>

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaLock />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Create Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>

        </div>

        <label className="form-label fw-semibold">
          Confirm Password
        </label>

        <div className="input-group mb-3">

          <span className="input-group-text">
            <FaLock />
          </span>

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            className="form-control"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>

        </div>

        <div className="form-check mb-4">

          <input
            className="form-check-input"
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          />

          <label className="form-check-label">

            I agree to the

            <Link
              to="#"
              className="ms-1"
            >
              Terms of Service
            </Link>

            {" "}and{" "}

            <Link to="#">
              Privacy Policy
            </Link>

          </label>

        </div>

        {message && (

          <div
            className={`alert alert-${messageType}`}
          >
            {message}
          </div>

        )}

        <button
          type="submit"
          className="btn btn-primary w-100 py-3"
        >
          Create Account
        </button>

        <p className="text-center mt-4">

          Already have an account?

          <Link
            to="/"
            className="ms-2"
          >
            Sign In
          </Link>

        </p>

      </form>

    </AuthLayout>

  );

}

export default Register;