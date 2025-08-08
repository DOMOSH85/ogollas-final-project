import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { authAPI } from './utils/api';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import FarmerDashboard from './components/FarmerDashboard';
import GovernmentDashboard from './components/GovernmentDashboard';
import LandManagement from './components/LandManagement';
import LandDetail from './components/LandDetail';
import Analytics from './components/Analytics';
import DetailedAnalytics from './components/DetailedAnalytics';

// Context for authentication
export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      // Fetch updated user profile from server
      authAPI.getProfile()
        .then(data => {
          // Update user data in state and localStorage
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
          setLoading(false);
        })
        .catch(err => {
          // If there's an error, remove the token and user data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {user && user.role === 'farmer' && (
                <>
                  <Route path="/dashboard" element={<FarmerDashboard />} />
                  <Route path="/land" element={<LandManagement />} />
                  <Route path="/land/:id" element={<LandDetail />} />
                </>
              )}
              {user && user.role === 'government' && (
                <>
                  <Route path="/dashboard" element={<GovernmentDashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/detailed-analytics" element={<DetailedAnalytics />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
