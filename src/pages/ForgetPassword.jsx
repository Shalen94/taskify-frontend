import React, { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './pages.css';


const ForgotResetPassword = () => {
  const [step, setStep] = useState(1); // 1 = send OTP, 2 = reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate() ;

  // STEP 1: Send OTP
  const handleSendOTP = async (e) => {
    const navigate = useNavigate() ;
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/forgotPassword", { email });
      toast.success(res.data.msg);
      setStep(2); // Move to reset password form
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match ❌");
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/resetPassword", {
        email,
        otp,
        newPassword,
      });
      toast.success(res.data.msg);
      // Optionally reset form
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/login" ) ;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 forgot-password">
      

      {step === 1 ? (
        // Step 1: Send OTP Form
        <form
          onSubmit={handleSendOTP}
          className="col-md-6 mx-auto card p-4 shadow-sm"
        >
            <h2 className="text-center mb-4">
        {step === 1 ? "Forgot Password 🔑" : "Reset Password 🔐"}
      </h2>
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>

          <p>Strike your password ? <a href="/login">Login Here</a></p>
        </form>
      ) : (
        // Step 2: Reset Password Form
        <form
          onSubmit={handleResetPassword}
          className="col-md-6 mx-auto card p-4 shadow-sm forgot-password"
        >
            <h2 className="text-center mb-4">
        {step === 1 ? "Forgot Password 🔑" : "Reset Password 🔐"}
      </h2>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            value={email}
            disabled
          />

          <label className="form-label">OTP</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control mb-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <button
            type="button"
            className="btn mt-2"
            onClick={() => navigate("/login")}
          >
            Back to LogIn
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotResetPassword;
