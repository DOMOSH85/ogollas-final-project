import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { landAPI, governmentAPI } from '../utils/api';
import Messaging from './Messaging';

const FarmerDashboard = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [policies, setPolicies] = useState([]);
  const [policyLoading, setPolicyLoading] = useState(true);
  const [policyError, setPolicyError] = useState('');

  useEffect(() => {
    fetchLands();
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      setPolicyLoading(true);
      const data = await governmentAPI.getPolicies();
      setPolicies(data);
    } catch (err) {
      setPolicyError('Failed to fetch policies');
    } finally {
      setPolicyLoading(false);
    }
  };

  const fetchLands = async () => {
    try {
      const data = await landAPI.getLands();
      setLands(data);
    } catch (err) {
      setError('Failed to fetch lands');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
  <div className="animate-fadeIn min-h-screen p-4 bg-white dark:bg-black-green">
      <div className="mb-8">
  <h1 className="text-3xl font-bold mb-2 text-black dark:text-light-green">Farmer Dashboard</h1>
  <p className="text-gray-700 dark:text-green">Manage your land and monitor sustainability metrics</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-deep-green dark:border-green dark:text-light-green px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl shadow-lg bg-gray-100 text-black dark:bg-gradient-primary dark:text-light-green">
          <h3 className="text-lg font-medium mb-2">Total Lands</h3>
          <p className="text-3xl font-bold">{lands.length}</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-green">
          <h3 className="text-lg font-medium mb-2">Total Area</h3>
          <p className="text-3xl font-bold">
            {lands.reduce((acc, land) => acc + land.size, 0)} acres
          </p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-green">
          <h3 className="text-lg font-medium mb-2">Avg Sustainability</h3>
          <p className="text-3xl font-bold">
            {lands.length > 0 
              ? Math.round(lands.reduce((acc, land) => acc + land.sustainabilityScore, 0) / lands.length) 
              : 0}%
          </p>
        </div>
      </div>

  <div className="p-6 rounded-2xl shadow-lg mb-8 bg-white text-black dark:bg-card-green dark:text-light-green">
        <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">Your Land Parcels</h2>
          <Link
            to="/land"
            className="bg-gradient-primary hover:bg-deep-green text-light-green font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Add New Land
          </Link>
        </div>
        
        {lands.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-medium mb-2 text-black dark:text-light-green">No land parcels yet</h3>
            <p className="mb-4 text-gray-700 dark:text-green">Get started by adding your first land parcel</p>
            <Link
              to="/land"
              className="bg-gradient-primary hover:bg-deep-green text-light-green font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Add Land Parcel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lands.map((land) => (
              <div
                key={land._id}
                className="border rounded-xl p-6 hover:shadow-lg transition duration-300 bg-gray-100 text-black border-green dark:bg-deep-green dark:text-light-green"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{land.name}</h3>
                  <span className="bg-card-green text-green text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {land.soilType}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green">Size:</span>
                    <span className="font-medium">{land.size} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green">Crops:</span>
                    <span className="font-medium">{land.crops?.length || 0} planted</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green">Sustainability:</span>
                    <span className="font-medium">{land.sustainabilityScore}%</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-green">
                  <Link
                    to={`/land/${land._id}`}
                    className="text-green hover:text-light-green font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-light-green">
          <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-lg mr-4 dark:bg-deep-green">
                <span className="text-green">🌱</span>
              </div>
              <div>
                <h3 className="font-medium">Soil Test Completed</h3>
                <p className="text-green text-sm">Parcel A - Nitrogen levels optimal</p>
                <p className="text-xs mt-1 text-gray-700 dark:text-light-green">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-lg mr-4 dark:bg-deep-green">
                <span className="text-green">💧</span>
              </div>
              <div>
                <h3 className="font-medium">Water Usage Recorded</h3>
                <p className="text-green text-sm">Parcel B - 500L used today</p>
                <p className="text-xs mt-1 text-gray-700 dark:text-light-green">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-light-green">
          <h2 className="text-2xl font-bold mb-4">Sustainability Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-green dark:bg-deep-green">
              <h3 className="font-medium text-green">Crop Rotation</h3>
              <p className="text-gray-800 text-sm dark:text-light-green">Rotate crops every season to maintain soil health</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-green dark:bg-deep-green">
              <h3 className="font-medium text-green">Water Conservation</h3>
              <p className="text-gray-800 text-sm dark:text-light-green">Use drip irrigation to reduce water usage by 30%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Policies Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-text-color mb-4">Government Policies</h2>
        {policyLoading ? (
          <div className="text-gray-500">Loading policies...</div>
        ) : policyError ? (
          <div className="text-red-600">{policyError}</div>
        ) : policies.length === 0 ? (
          <div className="text-gray-500">No policies found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policies.map((policy) => (
              <div key={policy._id} className="rounded-lg p-4 bg-green-50">
                <h3 className="font-bold text-text-color">{policy.title}</h3>
                <p className="text-text-color text-sm mt-2">{policy.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${policy.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {policy.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {policy.effectiveDate ? `Effective: ${new Date(policy.effectiveDate).toLocaleDateString()}` : 'No date'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-text-color mb-4">Government Services</h2>
          <div className="space-y-4">
            <Link to="/subsidies/apply" className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-300">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <span className="text-blue-600 text-xl">💰</span>
                </div>
                <div>
                  <h3 className="font-bold text-black-200">Apply for Subsidies</h3>
                  <p className="text-black-200 text-sm">Access government agricultural subsidies</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            
            <Link to="/equipment" className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition duration-300">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <span className="text-green-600 text-xl">🚜</span>
                </div>
                <div>
                  <h3 className="font-bold text-black-200">Equipment Management</h3>
                  <p className="text-black-200 text-sm">Add and monitor farming equipment</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-text-color mb-4">Quick Reports</h2>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-300 cursor-pointer" onClick={() => alert('Monthly report generation feature coming soon!')}>
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <span className="text-purple-600 text-xl">📊</span>
                </div>
                <div>
                  <h3 className="font-bold text-text-color">Monthly Report</h3>
                  <p className="text-text-color text-sm">Generate monthly farming report</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition duration-300 cursor-pointer" onClick={() => alert('Sustainability report feature coming soon!')}>
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <span className="text-yellow-600 text-xl">🌱</span>
                </div>
                <div>
                  <h3 className="font-bold text-text-color">Sustainability Report</h3>
                  <p className="text-text-color text-sm">Generate sustainability metrics report</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-text-color mb-4">Farm Management Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-bold text-text-color mb-2">Weather Forecast</h3>
            <p className="text-text-color text-sm">Stay updated with local weather conditions to plan your farming activities.</p>
            <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
              View Forecast →
            </button>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <h3 className="font-bold text-text-color mb-2">Market Prices</h3>
            <p className="text-text-color text-sm">Track current market prices for your crops to maximize profits.</p>
            <button className="mt-2 text-green-600 hover:text-green-800 text-sm font-medium">
              View Prices →
            </button>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-bold text-text-color mb-2">Expert Advice</h3>
            <p className="text-text-color text-sm">Connect with agricultural experts for personalized guidance.</p>
            <button className="mt-2 text-yellow-600 hover:text-yellow-800 text-sm font-medium">
              Get Advice →
            </button>
          </div>
        </div>
      </div>
      
      {/* Messaging Section */}
      <div className="mt-8">
        <Messaging userType="farmer" />
      </div>
    </div>
  );
};

export default FarmerDashboard;