import React from 'react';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HesapIslemler } from './components/HesapIslemler'; 
import { Home } from './components/Home';
import { Kartlar } from './components/Kartlar';
import { Profil } from './components/Profil';
import {Bildirimler} from './components/Bildirimler'
import { BlindsIcon } from 'lucide-react';
import { Yardim } from './components/Yardim';

const App = () => {
  return (
    <Router>
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/hesap-islemleri" element={<HesapIslemler />} />
        <Route path='/kartlar' element={<Kartlar />} />
        <Route path='/profil'element={<Profil />} />
        <Route path='/bildirimler' element={<Bildirimler />} />
        <Route path='/yardim' element={<Yardim />} />
      </Routes>
    </Router>
  );
};

export default App;