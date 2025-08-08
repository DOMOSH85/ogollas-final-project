import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { landAPI } from '../utils/api';

const LandManagement = () => {
  const [lands, setLands] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    location: {
      address: ''
    },
    soilType: 'loamy'
  });
  
  const navigate = useNavigate();

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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onLocationChange = (e) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [e.target.name]: e.target.value
      }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = await landAPI.createLand(formData);
      setLands([...lands, data]);
      setShowForm(false);
      setFormData({
        name: '',
        size: '',
        location: {
          address: ''
        },
        soilType: 'loamy'
      });
    } catch (err) {
      setError('Failed to create land parcel');
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Land Management</h1>
        <p className="text-gray-600">Register and manage your land parcels</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 animate-shake">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Land Parcels</h2>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            {showForm ? 'Cancel' : 'Add New Land'}
          </button>
        </div>
        
        {showForm && (
          <form onSubmit={onSubmit} className="mb-8 p-6 bg-gray-50 rounded-xl animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Land Parcel</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Land Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="Enter land name"
                />
              </div>
              
              <div>
                <label htmlFor="size" className="block text-gray-700 font-medium mb-2">Size (acres)</label>
                <input
                  type="number"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={onChange}
                  required
                  min="0"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="Enter size in acres"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.location.address}
                  onChange={onLocationChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  placeholder="Enter location address"
                />
              </div>
              
              <div>
                <label htmlFor="soilType" className="block text-gray-700 font-medium mb-2">Soil Type</label>
                <select
                  id="soilType"
                  name="soilType"
                  value={formData.soilType}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                >
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="silty">Silty</option>
                  <option value="peaty">Peaty</option>
                  <option value="chalky">Chalky</option>
                  <option value="loamy">Loamy</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Add Land Parcel
              </button>
            </div>
          </form>
        )}
        
        {lands.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No land parcels yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first land parcel</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Add Land Parcel
            </button>
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
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{land.location?.address || 'Not specified'}</span>
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
                  <button
                    onClick={() => navigate(`/land/${land._id}`)}
                    className="text-green-600 hover:text-green-800 font-medium text-sm"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Land Management Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <h3 className="font-bold text-gray-800">Soil Testing</h3>
            <p className="text-gray-600 text-sm mt-2">Regular soil testing helps maintain optimal nutrient levels</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-bold text-gray-800">Water Management</h3>
            <p className="text-gray-600 text-sm mt-2">Implement efficient irrigation systems to conserve water</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <h3 className="font-bold text-gray-800">Crop Rotation</h3>
            <p className="text-gray-600 text-sm mt-2">Rotate crops to prevent soil depletion and pest buildup</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandManagement;