import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Navbar from './components/NavBar';
import Homepage from './components/HomePage';
import ClassRoom from './components/ClassRoom';
import Teacher from './components/Teacher';
import RegisterClass from './components/RegisterClass';
import Login from './components/Account/Login';
import Footer from './components/Footer';

import PrivateRoute from './components/Account/PrivateRoute';
import HomeAccount from './components/Account/Home.account';
import LeavesAccount from './components/Account/Leaves.account';
import BuyAccount from './components/Account/BuyItems.account';
import Account from './components/Account/Account';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, [location.pathname, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Homepage isLoggedIn='true' />} />
          <Route path="/giaovien" element={<Teacher />} />
          <Route path="/lophoc" element={<ClassRoom />} />
          <Route path="/dangki" element={<RegisterClass />} />
          <Route path="/dangnhap" element={<Login setIsLoggedIn={setIsLoggedIn} />} />


          <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/taikhoan" element={<Account />} />
            <Route path="/trangchu" element={<HomeAccount />} />
            <Route path="/nghihoc" element={<LeavesAccount />} />
            <Route path="/muahang" element={<BuyAccount />} />
          </Route>


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
