import axios from "axios" ;

const api = axios.create({
    baseURL:"https://taskify-backend-5767.onrender.com",
    withCredentials: true
}) ;

export default api ;
