import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import { loginUser } from "../../api/authApi";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (

            formData.email === "" ||

            formData.password === ""

        ) {

            alert("Please enter email and password.");

            return;

        }

        try {

            const response = await loginUser(formData);

            // Save token

            localStorage.setItem(

                "token",

                response.access_token

            );

            // Save logged in user

            localStorage.setItem(

                "user",

                JSON.stringify(response.user)

            );

            alert("Login Successful");

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.detail ||

                "Invalid Email or Password"

            );

        }

    };

    return (

        <div className="login-container">

            <div className="login-left">

                <div className="login-card">

                    <h1>ContractIQ</h1>

                    <p className="subtitle">

                        User Authentication & Role Management

                    </p>

                    <form onSubmit={handleSubmit}>

                        <label>Email</label>

                        <input

                            type="email"

                            name="email"

                            placeholder="Enter Email"

                            value={formData.email}

                            onChange={handleChange}

                        />

                        <label>Password</label>

                        <div className="password-box">

                            <input

                                type={

                                    showPassword

                                        ?

                                        "text"

                                        :

                                        "password"

                                }

                                name="password"

                                placeholder="Enter Password"

                                value={formData.password}

                                onChange={handleChange}

                            />

                            <button

                                type="button"

                                className="show-btn"

                                onClick={() =>

                                    setShowPassword(

                                        !showPassword

                                    )

                                }

                            >

                                {

                                    showPassword

                                        ?

                                        "Hide"

                                        :

                                        "Show"

                                }

                            </button>

                        </div>

                        <div className="login-options">

                            <label className="remember">

                                <input type="checkbox" />

                                Remember Me

                            </label>

                            <Link

                                to="/reset-password"

                                className="forgot-link"

                            >

                                Forgot Password?

                            </Link>

                        </div>

                        <button

                            type="submit"

                            className="login-btn"

                        >

                            Login

                        </button>

                    </form>

                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

            <div className="login-right">

                <div className="welcome-card">

                    <h2>

                        Welcome Back!

                    </h2>

                    <p>

                        User Management Dashboard

                    </p>

                    <ul>

                        <li>

                            ✔ User Registration

                        </li>

                        <li>

                            ✔ Role Based Access

                        </li>

                        <li>

                            ✔ Secure Login

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

}

export default Login;
