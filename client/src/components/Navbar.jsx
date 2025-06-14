import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiBell, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Hesap İşlemleri', path: '/hesap-islemleri' },
    { name: 'Kartlarım', path: '/kartlar' }
  ];

  const profileItems = [
    { name: 'Profilim', icon: <FiUser className="mr-2" />, path: '/profil' },
    { name: 'Bildirimler', icon: <FiBell className="mr-2" />, path: '/bildirimler' },
    { name: 'Yardım', icon: <FiHelpCircle className="mr-2" />, path: '/yardim' },
  
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
            
              <span className="ml-2 text-white font-semibold text-xl hidden sm:block">DijitalBank</span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex md:items-center md:space-x-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-blue-100 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-700/50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Profile and Mobile Button */}
          <div className="flex items-center space-x-4">
           

            {/* Profile Dropdown */}
            <div className="relative ml-3">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none"
                id="user-menu"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
                  AY
                </div>
                <span className="ml-2 text-white hidden md:inline">Ahmet Yılmaz</span>
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
                  >
                    {profileItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-blue-100 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-blue-600 mt-2 pt-2">
                {profileItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-600 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;