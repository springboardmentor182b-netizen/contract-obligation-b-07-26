import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "450px" }}
      >
        <h2 className="text-center fw-bold">
          Forgot Password
        </h2>

        <p className="text-center text-muted mb-4">
          Enter your registered email to receive a password reset link.
        </p>

        <form>
          <label className="form-label">Email Address</label>

          <div className="input-group mb-4">
            <span className="input-group-text">
              <FaEnvelope />
            </span>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>

          <button className="btn btn-warning w-100">
            Send Reset Link
          </button>

          <p className="text-center mt-4">
            Remember your password?{" "}
            <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;