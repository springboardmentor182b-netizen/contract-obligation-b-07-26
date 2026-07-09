import "./login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>

      <input type="email" placeholder="Enter Email" />
      <br /><br />

      <input type="password" placeholder="Enter Password" />
      <br /><br />

      <button className="login-btn">Login</button>

      <hr />

      <button className="google-btn">
        Continue with Google
      </button>

      <button className="facebook-btn">
        Continue with Facebook
      </button>

      <button className="github-btn">
        Continue with GitHub
      </button>

      <button className="apple-btn">
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