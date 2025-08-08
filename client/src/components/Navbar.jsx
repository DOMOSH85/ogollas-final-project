import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="animate-pulse">🌱</span>
            <span className="ml-2">Greenlands</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="hidden md:inline">Welcome, {user.name}</span>
                <Link 
                  to="/dashboard" 
                  className="hover:text-green-200 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-green-200 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;