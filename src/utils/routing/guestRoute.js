import react from "react";
import { Navigate } from "react-router-dom";
import { getSessionStorageResponse } from "../sessionStorage/getObject";

const GuestRoute = ({ children }) => {
    const isLoggedIn = getSessionStorageResponse('isLogin', 'userData')
    const loginVal = isLoggedIn.isLogin
    const userData = isLoggedIn.userData
    console.log(loginVal, userData) 
    
    return loginVal === true && Object.keys(userData).length > 0 ? <Navigate to="/" replace /> : children
}

export default GuestRoute