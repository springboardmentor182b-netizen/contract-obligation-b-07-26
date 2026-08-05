import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: "",

        confirmPassword: ""

    });

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if(formData.password !== formData.confirmPassword){

            alert("Passwords do not match");

            return;

        }

        alert("Password Reset Successfully");

        navigate("/login");

    };

    return(

        <div className="reset-container">

            <div className="reset-card">

                <h2>Reset Password</h2>

                <p>Create a new password for your account.</p>

                <form onSubmit={handleSubmit}>

                    <label>Email</label>

                    <input

                        type="email"

                        name="email"

                        placeholder="Enter Email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                    />

                    <label>New Password</label>

                    <div className="password-box">

                        <input

                            type={showPassword ? "text" : "password"}

                            name="password"

                            placeholder="Enter New Password"

                            value={formData.password}

                            onChange={handleChange}

                            required

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

                            required

                        />

                        <button

                            type="button"

                            className="show-btn"

                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}

                        >

                            {showConfirmPassword ? "Hide" : "Show"}

                        </button>

                    </div>

                    <button

                        className="reset-btn"

                        type="submit"

                    >

                        Reset Password

                    </button>

                </form>

                <Link

                    to="/login"

                    className="back-login"

                >

                    ← Back to Login

                </Link>

            </div>

        </div>

    );

}

export default ResetPassword;
