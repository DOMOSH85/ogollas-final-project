import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { equipmentAPI } from '../utils/api';

const EquipmentManagement = () => {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [equipmentData, setEquipmentData] = useState({
    name: '',
    type: '',
    manufacturer: '',
    model: '',
    purchaseDate: '',
    purchasePrice: ''
  });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const data = await equipmentAPI.getEquipment();
      setEquipment(data);
    } catch (err) {
      setError('Failed to fetch equipment');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    
    try {
      const newEquipment = await equipmentAPI.addEquipment(equipmentData);
      setEquipment([...equipment, newEquipment]);
      setShowAddForm(false);
      setEquipmentData({
        name: '',
        type: '',
        manufacturer: '',
        model: '',
        purchaseDate: '',
        purchasePrice: ''
      });
    } catch (err) {
      setError('Failed to add equipment');
    }
  };

  const handleChange = (e) => {
    setEquipmentData({
      ...equipmentData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-green-600 hover:text-green-800 font-medium mb-4 transition duration-300"
        >
          ← Back
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Equipment Management</h1>
            <p className="text-gray-600">Track and manage your farming equipment</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Add Equipment
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Equipment</h2>
          <form onSubmit={handleAddEquipment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Equipment Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={equipmentData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Enter equipment name"
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={equipmentData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Enter equipment type"
              />
            </div>
            
            <div>
              <label htmlFor="manufacturer" className="block text-gray-700 font-medium mb-2">Manufacturer</label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={equipmentData.manufacturer}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Enter manufacturer"
              />
            </div>
            
            <div>
              <label htmlFor="model" className="block text-gray-700 font-medium mb-2">Model</label>
              <input
                type="text"
                id="model"
                name="model"
                value={equipmentData.model}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Enter model"
              />
            </div>
            
            <div>
              <label htmlFor="purchaseDate" className="block text-gray-700 font-medium mb-2">Purchase Date</label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={equipmentData.purchaseDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="purchasePrice" className="block text-gray-700 font-medium mb-2">Purchase Price (KES)</label>
              <input
                type="number"
                id="purchasePrice"
                name="purchasePrice"
                value={equipmentData.purchasePrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                placeholder="Enter purchase price"
              />
            </div>
            
            <div className="md:col-span-2 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-300"
              >
                Add Equipment
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Equipment</h2>
        
        {equipment.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🚜</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No equipment added yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your farming equipment</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              Add Equipment
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 font-medium text-gray-600">Equipment</th>
                  <th className="pb-3 font-medium text-gray-600">Type</th>
                  <th className="pb-3 font-medium text-gray-600">Manufacturer</th>
                  <th className="pb-3 font-medium text-gray-600">Purchase Date</th>
                  <th className="pb-3 font-medium text-gray-600">Status</th>
                  <th className="pb-3 font-medium text-gray-600">Usage Hours</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((item) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium text-gray-800">{item.name}</td>
                    <td className="py-4 text-gray-600">{item.type}</td>
                    <td className="py-4 text-gray-600">{item.manufacturer || 'N/A'}</td>
                    <td className="py-4 text-gray-600">
                      {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600">{item.usageHours || 0} hours</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-400">
          <h3 className="font-bold text-gray-800 mb-2">Maintenance Tips</h3>
          <p className="text-gray-600 text-sm">
            Regular maintenance can extend equipment life by up to 30%. Schedule routine checks and keep maintenance records updated.
          </p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-400">
          <h3 className="font-bold text-gray-800 mb-2">Usage Tracking</h3>
          <p className="text-gray-600 text-sm">
            Monitor equipment usage hours to optimize performance and schedule maintenance. This helps in making informed replacement decisions.
          </p>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-2xl border-l-4 border-yellow-400">
          <h3 className="font-bold text-gray-800 mb-2">Cost Management</h3>
          <p className="text-gray-600 text-sm">
            Track equipment costs and depreciation to better understand your farm's financial health and plan for future investments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EquipmentManagement;