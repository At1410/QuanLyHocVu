import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Management/Navbar';

import Homepage from './components/Management/Homepage';
import ClassRoom from './components/Management/Classroom/Home';
import Information from './components/Management/Information/Home';
import Staff from './components/Management/Staff/Home';
import LoginForm from './components/Login/LoginForm';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/lophoc" element={<ClassRoom />} />
        <Route path="/thongtin" element={<Information />} />
        <Route path="/nhanvien" element={<Staff />} />
        <Route path="/dangxuat" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
