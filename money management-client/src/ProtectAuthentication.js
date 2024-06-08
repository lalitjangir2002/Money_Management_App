import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectAuthentication = ({element}) => {
    const isAuthenticated = useSelector((state) => state.data.auth.isAuthenticated);
    // console.log(isAuthenticated)
  
    return isAuthenticated ? element : <Navigate to="/login" />;
}

export default ProtectAuthentication