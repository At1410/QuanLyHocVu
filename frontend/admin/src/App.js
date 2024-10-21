import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Management/Navbar';

import Homepage from './components/Management/Homepage';
import ClassRoom from './components/Management/Classroom/Home';
import Information from './components/Management/Information/Home';
import Staff from './components/Management/Staff/Home';
import Users from './components/Management/Users/Home';

import LoginForm from './components/Login/LoginForm';
import PrivateRoute from './components/Login/PrivateRoute';
import ManagementClassRoomHome from './components/Management/Classroom/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (!loggedIn && location.pathname !== '/dangnhap') {
      navigate('/dangnhap');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {isLoggedIn && location.pathname !== '/dangnhap' && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/dangnhap" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
        <Route path="/thongtin" element={<PrivateRoute element={<Information />} />} />
        <Route path="/nguoidung" element={<PrivateRoute element={<Users />} />} />
        <Route path="/lophoc" element={<PrivateRoute element={<ClassRoom />} />} />
        <Route path="/nhanvien" element={<PrivateRoute element={<Staff />} />} />
        <Route path="/*" element={<PrivateRoute element={<ManagementClassRoomHome />} />} />
      </Routes>
    </>
  );
}

export default App;
