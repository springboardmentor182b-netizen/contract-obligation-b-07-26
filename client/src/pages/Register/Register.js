import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.fullName === "" ||
      formData.email === "" ||
      formData.phone === "" ||
      formData.department === "" ||
      formData.role === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

  
    console.log(formData);

    alert("Registration Successful!");

    navigate("/login");
  };

  return (
    <div className="register-container">

      <div className="register-left">

        <div className="register-card">

          <h1>ContractIQ</h1>

          <p className="subtitle">
            Create Your Account
          </p>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Phone</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter 10 digits"
              value={formData.phone}
              onChange={handleChange}
            />

            <label>Department</label>

            <input
              type="text"
              name="department"
              placeholder="Legal"
              value={formData.department}
              onChange={handleChange}
            />

            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option>Administrator</option>
              <option>Legal Manager</option>
              <option>Compliance Officer</option>
              <option>Contract Manager</option>
              <option>Department Head</option>
              <option>Employee</option>
            </select>

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            <label>Confirm Password</label>

            <div className="password-box">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>

            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Register
            </button>

          </form>

          <p className="login-text">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

      <div className="register-right">

        <div className="welcome-card">

          <h2>Welcome to ContractIQ</h2>

          <p>
            User Authentication & Role Management
          </p>

          <ul>
            <li>✔ Secure Registration</li>
            <li>✔ Role Based Access Control</li>
            <li>✔ User Management</li>
            <li>✔ Contract Compliance Dashboard</li>
          </ul>

        </div>

      </div>

    </div>
  );
}

export default Register;
