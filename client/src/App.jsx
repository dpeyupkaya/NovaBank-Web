import React from 'react'; // Doğru import
import { Navbar } from './components/Navbar';
import { Router, Routes, Route } from 'react-router-dom';
import { HesapIslemler } from './components/HesapIslemler'; 
import { Home } from './components/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/hesap-islemleri" element={<HesapIslemler />} />
      </Routes>
    </Router>
  );
};

export default App;