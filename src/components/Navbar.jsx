import React, { useContext } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import api from "../api/axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const {isAuth,setIsAuth} = useContext(GlobalContext) ;
  const navigate = useNavigate() ;
  const handleLogout = async() =>{
    try{
      await api.post("/auth/logout") ;
      setIsAuth(false);
      toast.success("Logged out successfully ✅")
      navigate("/") ;
    }catch(err){
       console.log("logOut failed") ;
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3" style={{background:"black"}}>
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/" style={{fontSize:"2.0rem"}}>
          Taskify
        </Link>

        {/* Toggler / Hamburger Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav" style={{fontSize:"1.3rem"}}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                  className="nav-link active" 
                  to={isAuth === true ? "/dashboard":"/"}
                >
                  Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" 
                    to={isAuth === true ? "/todos":"/about"}
                  >
                      {isAuth===true? "Todos" : "About"}
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" 
                    to={isAuth === true ? "/addTask":"/services"}>
                    {isAuth===true? "Add Task" : "Services"}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
             <li className="nav-item">
                {isAuth===true ? 
                <button 
                  style={{border:"none" ,backgroundColor:"transparent",color:"#ff5656",fontSize:"1 rem",padding:"7px 5px"}}
                  className="nav-item"
                  onClick={handleLogout}>LogOut</button>
                :
                  <Link className="nav-link" to="/login">Sign In</Link>
                }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
