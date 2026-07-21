import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

import AuthLayout from "../components/AuthLayout";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setMessage(
      "Password reset link has been sent to your email."
    );

  };

  return (

    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your registered email address."
    >

      <Link
        to="/"
        className="text-decoration-none small"
      >
        <FaArrowLeft className="me-2"/>
        Back to Sign In
      </Link>

      <form
        className="mt-4"
        onSubmit={handleSubmit}
      >

        <label className="form-label fw-semibold">

          Company Email

        </label>

        <div className="input-group mb-4">

          <span className="input-group-text">

            <FaEnvelope/>

          </span>

          <input
            type="email"
            className="form-control"
            placeholder="name@company.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

        </div>

        {message && (

          <div className="alert alert-success">

            {message}

          </div>

        )}

        <button
          className="btn btn-primary w-100 py-3"
          type="submit"
        >

          Send Reset Link

        </button>

      </form>

      <div
        className="mt-5 p-3 rounded-3"
        style={{
          background:"#EEF6FF",
        }}
      >

        <div className="d-flex">

          <FaShieldAlt
            className="me-3 mt-1"
            color="#2563EB"
          />

          <div>

            <h6 className="fw-bold">

              Security Notice

            </h6>

            <small className="text-muted">

              If an account exists with this email,
              you'll receive password reset instructions.
              The reset link expires in 30 minutes.

            </small>

          </div>

        </div>

      </div>

    </AuthLayout>

  );

}

export default ForgotPassword;