import "./login.css";
import { Link } from "react-router-dom";
function ForgotPassword() {
  return (
    <div className="login-container">
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter your registered email"
      />

      <br /><br />

      <button>Send Reset Link</button>

      <Link to="/">Back to Login</Link>
    </div>
  );
}

export default ForgotPassword;