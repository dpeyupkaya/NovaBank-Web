import React, { useState } from 'react';


export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-orange-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-lg font-bold">
        <img src="/logo/ing.png"  className="h-10" />

        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="text-white hover:text-gray-200">Hesap  İşlemleri</a></li>
          <li><a href="#" className="text-white hover:text-gray-200">Para Transferi</a></li>
          <li><a href="#" className="text-white hover:text-gray-200">Ödemeler</a></li>
          <li><a href="#" className="text-white hover:text-gray-200">Kartlar</a></li>
          <li><a href="#" className="text-white hover:text-gray-200">Daha Fazla</a></li>
        </ul>

       
        <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

   
      <div className={`fixed inset-y-0 left-0 w-64 bg-orange-500 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="p-4">
       
          <ul className="space-y-4">
            <li><a href="#" className="text-white hover:text-gray-200">Hesap İşlemleri</a></li>
            <li><a href="#" className="text-white hover:text-gray-200">Para Transferi</a></li>
            <li><a href="#" className="text-white hover:text-gray-200">Ödemeler</a></li>
            <li><a href="#" className="text-white hover:text-gray-200">Kartlar</a></li>
            <li><a href="#" className="text-white hover:text-gray-200">Daha Fazla</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;