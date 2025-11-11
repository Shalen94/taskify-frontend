import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './pages.css'
import { toast } from 'react-toastify';
import { GlobalContext } from '../context/GlobalContext';

const Login = () => {
    const { setIsAuth } = useContext(GlobalContext);
    const [form,setForm] = useState({
        email: "",
        password:""
    }) ;
    const navigate = useNavigate(); 
    
    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value}) ;
    } ;

    const handleSubmit = async (e) =>{
        e.preventDefault() ;
        try{
            await api.post("/auth/login",form,{withCredentials:true});
            toast.success("Logged in successfully ✅");
            setIsAuth(true);
            navigate("/dashboard") ;
        }catch(err){
            toast.error("Login failed: ❌ ") ;
            console.log(err.response?.data?.msg);
        }
    };

  return (
    <div className='login'>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
            <br />
            <br />
            <p>Forgot Password ? <a href="/forgot_password">No Worries Click Here</a></p>
            
            <p>Don't have an account? <a href="/register">Register Here</a></p>
        </form>
        

    </div>
  ) ;
} ;

export default Login