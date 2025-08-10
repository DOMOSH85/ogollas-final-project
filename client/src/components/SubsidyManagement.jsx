import React, { useState, useEffect } from 'react';
import { governmentAPI, subsidyAPI } from '../utils/api';

const SubsidyManagement = () => {
  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSubsidy, setEditingSubsidy] = useState(null);
  const [subsidyData, setSubsidyData] = useState({
    name: '',
    description: '',
    amount: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchSubsidies();
  }, []);

  const fetchSubsidies = async () => {
    try {
      setLoading(true);
      // Use the government API to get all subsidies
      const data = await governmentAPI.getAllSubsidies();
      setSubsidies(data);
    } catch (err) {
      setError('Failed to fetch subsidies');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubsidy = async (e) => {
    e.preventDefault();
    try {
      await governmentAPI.createSubsidy(subsidyData);
      setSubsidyData({
        name: '',
        description: '',
        amount: '',
        status: 'pending'
      });
      setShowCreateForm(false);
      fetchSubsidies(); // Refresh the list
    } catch (err) {
      setError('Failed to create subsidy');
    }
  };

  const handleUpdateSubsidy = async (e) => {
    e.preventDefault();
    try {
      await governmentAPI.updateSubsidy(editingSubsidy._id, subsidyData);
      setEditingSubsidy(null);
      setSubsidyData({
        name: '',
        description: '',
        amount: '',
        status: 'pending'
      });
      fetchSubsidies(); // Refresh the list
    } catch (err) {
      setError('Failed to update subsidy');
    }
  };

  const handleApproveSubsidy = async (id) => {
    try {
      await governmentAPI.updateSubsidy(id, { status: 'approved' });
      fetchSubsidies(); // Refresh the list
    } catch (err) {
      setError('Failed to approve subsidy');
    }
  };

  const handleRejectSubsidy = async (id) => {
    try {
      await governmentAPI.updateSubsidy(id, { status: 'rejected' });
      fetchSubsidies(); // Refresh the list
    } catch (err) {
      setError('Failed to reject subsidy');
    }
  };

  const handleEdit = (subsidy) => {
    setEditingSubsidy(subsidy);
    setSubsidyData({
      name: subsidy.name,
      description: subsidy.description,
      amount: subsidy.amount,
      status: subsidy.status
    });
  };

  const handleChange = (e) => {
    setSubsidyData({
      ...subsidyData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
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
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Subsidy Management</h2>
        <button 
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setEditingSubsidy(null);
            setSubsidyData({
              name: '',
              description: '',
              amount: '',
              status: 'pending'
            });
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          {showCreateForm ? 'Cancel' : 'Create Subsidy'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {(showCreateForm || editingSubsidy) && (
        <div className="mb-8 bg-gray-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingSubsidy ? 'Edit Subsidy' : 'Create New Subsidy'}
          </h3>
          <form onSubmit={editingSubsidy ? handleUpdateSubsidy : handleCreateSubsidy} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Subsidy Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={subsidyData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter subsidy name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={subsidyData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter subsidy description"
              ></textarea>
            </div>

            <div>
              <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                Amount (KES)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={subsidyData.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter subsidy amount"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={subsidyData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingSubsidy(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg"
              >
                {editingSubsidy ? 'Update Subsidy' : 'Create Subsidy'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subsidy Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Farmer
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subsidies.map((subsidy) => (
              <tr key={subsidy._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{subsidy.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{subsidy.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">KES {subsidy.amount?.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(subsidy.status)}`}>
                    {subsidy.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subsidy.farmer ? `${subsidy.farmer.name} (${subsidy.farmer.email})` : 'Government Program'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {subsidy.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleEdit(subsidy)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleApproveSubsidy(subsidy._id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectSubsidy(subsidy._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {subsidy.status === 'approved' && (
                    <span className="text-green-600">Approved</span>
                  )}
                  {subsidy.status === 'rejected' && (
                    <span className="text-red-600">Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubsidyManagement;