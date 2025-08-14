import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center py-20 bg-header-bg text-green-500 rounded-2xl shadow-xl mb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-bounceIn">
            Sustainable Land Management
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-fadeInUp">
            Empowering farmers and governments with technology for a greener future
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="bg-white text-green-700 hover:bg-green-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-green-700 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="bg-white text-green-700 hover:bg-green-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-text-color">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-card-bg p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2">
              <div className="text-5xl mb-6 text-green-500">🌱</div>
              <h3 className="text-2xl font-bold mb-4 text-text-color">Land Monitoring</h3>
              <p className="text-text-color">
                Track soil health, water usage, and crop performance with real-time data analytics.
              </p>
            </div>
            
            <div className="bg-card-bg p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2">
              <div className="text-5xl mb-6 text-blue-500">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-text-color">Analytics Dashboard</h3>
              <p className="text-text-color">
                Government agencies can monitor regional sustainability trends and policy effectiveness.
              </p>
            </div>
            
            <div className="bg-card-bg p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2">
              <div className="text-5xl mb-6 text-purple-500">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-text-color">Collaborative Platform</h3>
              <p className="text-text-color">
                Facilitate communication between farmers and government for better policy implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-bg-color rounded-2xl">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-text-color">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center flex-1">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text-color">Register</h3>
              <p className="text-text-color">
                Farmers and government officials create accounts tailored to their roles.
              </p>
            </div>
            
            <div className="text-center flex-1">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text-color">Monitor</h3>
              <p className="text-text-color">
                Track land usage, sustainability metrics, and environmental impact.
              </p>
            </div>
            
            <div className="text-center flex-1">
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 animate-pulse">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text-color">Collaborate</h3>
              <p className="text-text-color">
                Share insights and work together for sustainable land management.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;