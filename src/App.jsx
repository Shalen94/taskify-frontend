import React, { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import {ToastContainer} from "react-toastify" ;
import 'react-toastify/dist/ReactToastify.css' ;
import Todos from './pages/Todos.jsx'
import AddTask from './pages/AddTask.jsx'
import bg1 from './assets/bg1.jpg' ;
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
const App = () => {
  const [isAuth,setIsAuth] = useState(false);
  return (
    <div  style={{
    backgroundImage: `url(${bg1})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: "fixed", 
  }}>
      <Navbar/>
      <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgot_password' element={<ForgetPassword/>} />
        <Route path='/reset_password' element={<ResetPassword/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/dashboard'
                element ={
                  <ProtectedRoute>
                    <Dashboard/>
                  </ProtectedRoute>
                }
        />
        <Route path='/todos'
                element ={
                  <ProtectedRoute>
                    <Todos/>
                  </ProtectedRoute>
                }
        />
        <Route path='/addTask'
                element ={
                  <ProtectedRoute>
                    <AddTask/>
                  </ProtectedRoute>
                }
        />

      </Routes>

      <Footer/>
    </div>
  )
}

export default App