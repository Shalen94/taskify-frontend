import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-toastify';

const Register = () => {

    const [error, setError] = useState(""); // 🆕 For backend messages
    const [success, setSuccess] = useState(""); // 🆕 Optional success message

    const [form,setForm] = useState({
        name:"",
        email: "",
        password: ""
    });
    const navigate = useNavigate() ;

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value}) ;
    } ;

    const handleSubmit = async (e) =>{
        e.preventDefault() ;
        setError("");
        setSuccess("");
        try{
            await api.post("/auth/register",form);
            toast.success("Registration successful ✅ ") ;
            navigate("/login") ;
            setSuccess(res.data.msg);
        }catch(err){
            console.log(err) ;
            if (err.response && err.response.data.msg) {
                setError(err.response.data.msg); // ✅ show backend error message
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

  return (
    <div className='form-container login'>
        
      {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" name='name' placeholder='Name' onChange={handleChange} required />
            <input type="email" name='email' placeholder='Email' onChange={handleChange} required />
            <input type="password" name='password' placeholder='Password' onChange={handleChange} required />
            <button type='submit'>Register</button>
            <a href="/login">Back to login</a>
            <br />
            <br />
        </form>
    </div>
  )
}

export default Register ;