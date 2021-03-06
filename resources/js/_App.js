import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerify from "./pages/EmailVerify";

function _APP() {
    return (
        <Routes >
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/reset-password/:token" element={<ResetPassword />} />
            <Route exact path="/verify-email" element={<EmailVerify />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}

export default _APP;
