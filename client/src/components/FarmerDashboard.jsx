import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { landAPI } from '../utils/api';

const FarmerDashboard = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLands();
  }, []);

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
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Farmer Dashboard</h1>
        <p className="text-gray-600">Manage your land and monitor sustainability metrics</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Lands</h3>
          <p className="text-3xl font-bold">{lands.length}</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Area</h3>
          <p className="text-3xl font-bold">
            {lands.reduce((acc, land) => acc + land.size, 0)} acres
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Avg Sustainability</h3>
          <p className="text-3xl font-bold">
            {lands.length > 0 
              ? Math.round(lands.reduce((acc, land) => acc + land.sustainabilityScore, 0) / lands.length) 
              : 0}%
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Land Parcels</h2>
          <Link 
            to="/land" 
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Add New Land
          </Link>
        </div>
        
        {lands.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No land parcels yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first land parcel</p>
            <Link 
              to="/land" 
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Add Land Parcel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lands.map((land) => (
              <div 
                key={land._id} 
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{land.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {land.soilType}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{land.size} acres</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crops:</span>
                    <span className="font-medium">{land.crops?.length || 0} planted</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sustainability:</span>
                    <span className="font-medium">{land.sustainabilityScore}%</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    to={`/land/${land._id}`} 
                    className="text-green-600 hover:text-green-800 font-medium text-sm"
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
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <span className="text-green-600">🌱</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Soil Test Completed</h3>
                <p className="text-gray-600 text-sm">Parcel A - Nitrogen levels optimal</p>
                <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <span className="text-blue-600">💧</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Water Usage Recorded</h3>
                <p className="text-gray-600 text-sm">Parcel B - 500L used today</p>
                <p className="text-gray-500 text-xs mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sustainability Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-medium text-gray-800">Crop Rotation</h3>
              <p className="text-gray-600 text-sm">Rotate crops every season to maintain soil health</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h3 className="font-medium text-gray-800">Water Conservation</h3>
              <p className="text-gray-600 text-sm">Use drip irrigation to reduce water usage by 30%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;