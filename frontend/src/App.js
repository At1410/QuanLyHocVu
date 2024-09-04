import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import Homepage from './components/HomePage';
import ClassRoom from './components/ClassRoom';
import Teacher from './components/Teacher';
import RegisterClass from './components/RegisterClass';
import Footer from './components/Footer';

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/giaovien" element={<Teacher />} />
          <Route path="/lophoc" element={<ClassRoom />} />
          <Route path="/dangki" element={<RegisterClass />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
