import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn }) => {
    return isLoggedIn ? <Outlet /> : <Navigate to="/dangnhap" replace />;
};

export default PrivateRoute;
