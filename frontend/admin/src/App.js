import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Management/Navbar';
import Homepage from './components/Management/Homepage';
import ClassRoom from './components/Management/Classroom/Home';
import Information from './components/Management/Information/Home';
import Staff from './components/Management/Staff/Home';
import LoginForm from './components/Login/LoginForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/dangnhap" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/lophoc" element={<ClassRoom />} />
            <Route path="/thongtin" element={<Information />} />
            <Route path="/nhanvien" element={<Staff />} />
            <Route path="/dangxuat" element={<Navigate to="/dangnhap" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/dangnhap" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
