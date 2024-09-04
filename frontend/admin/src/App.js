import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Management/Navbar';
import Homepage from './components/Management/Homepage';
import ClassRoom from './components/Management/Classroom/Home';
import Information from './components/Management/Information/Home';
import Staff from './components/Management/Staff/Home';
import LoginForm from './components/Login/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  return (
    <>
      {isLoggedIn && location.pathname !== '/dangnhap' && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/dangnhap" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/lophoc" element={<ClassRoom />} />
            <Route path="/thongtin" element={<Information />} />
            <Route path="/nhanvien" element={<Staff />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/dangnhap" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;
