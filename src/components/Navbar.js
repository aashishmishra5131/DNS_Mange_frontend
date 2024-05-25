// src/components/Navbar.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useAuth } from '../AuthProvider';

const Navbar = () => {
  const { isLoggedIn, firstLetter, login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token && email) {
      login(email);
    }
  }, [login]);

  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Home
        </Link>
        <div className="text-white text-lg font-bold">
          DNS System
        </div>
        <div className="relative">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="text-white text-lg font-bold">
              {isLoggedIn ? firstLetter : 'SignIn'}
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              {isLoggedIn ? null : (
                <>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/login"
                        className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                      >
                        Login
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/register"
                        className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
                      >
                        Register
                      </Link>
                    )}
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
