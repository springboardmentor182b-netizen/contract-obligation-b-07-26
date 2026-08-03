import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";

import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";

import Profile from "../pages/Profile/Profile";

import ResetPassword from "../pages/ResetPassword/ResetPassword";

function AppRoutes(){

    return(

        <Routes>

            <Route

                path="/"

                element={<Navigate to="/login" />}

            />

            <Route

                path="/login"

                element={<Login />}

            />

            <Route

                path="/register"

                element={<Register />}

            />

            <Route

                path="/dashboard"

                element={<Dashboard />}

            />

            <Route

                path="/profile"

                element={<Profile />}

            />

            <Route

                path="/reset-password"

                element={<ResetPassword />}

            />

        </Routes>

    );

}

export default AppRoutes;
