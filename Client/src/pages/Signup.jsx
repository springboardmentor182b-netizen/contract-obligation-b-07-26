import "./login.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="login-container">
      <h1>Sign Up</h1>

      <input
        type="text"
        placeholder="Enter Full Name"
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
      />

      <br /><br />

      <input
        type="password"
        placeholder="Create Password"
      />

      <br /><br />

      <input
        type="password"
        placeholder="Confirm Password"
      />

      <br /><br />

      <button>Create Account</button>

      <p>
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;