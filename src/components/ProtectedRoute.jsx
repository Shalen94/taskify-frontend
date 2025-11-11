import React, { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const {isAuth,setIsAuth} = useContext(GlobalContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/check",{withCredentials:true}); // ✅ correct endpoint
        if (res.data.user) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth(); // ✅ call the function here
  }, []);

  if (isAuth === null) return <p>Checking authentication...</p>;
  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
