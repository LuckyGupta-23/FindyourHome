import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthState from './../hooks/useAuthState';



const PrivateRoute = () => {
     const {loggedIn} = useAuthState();


  return loggedIn ?   <Outlet/> : <Navigate to="/SignIn" /> 
   
}

export default PrivateRoute

