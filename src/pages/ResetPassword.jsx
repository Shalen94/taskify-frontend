import React, { useState } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/resetPassword", form);
      toast.success(res.data.msg);
      setForm({ email: "", otp: "", newPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error resetting the password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mt-5'>
      <h2 className="text-center mb-4">Reset Password 🔐</h2>
      <form onSubmit={handleSubmit} className='col-md-6 mx-auto card p-4 shadow-sm'>
        <label>Email</label>
        <input type="email" name='email' className='form-control mb-3' value={form.email} onChange={handleChange} required />

        <label>OTP</label>
        <input type="text" name='otp' className='form-control mb-3' value={form.otp} onChange={handleChange} required />

        <label>New Password</label>
        <input type="password" name='newPassword' className='form-control mb-3' value={form.newPassword} onChange={handleChange} required />

        <button type="submit" className='btn btn-success w-100' disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
