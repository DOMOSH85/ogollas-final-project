// ...existing code...

import React, { useState, useEffect } from 'react';
import { governmentAPI, subsidyAPI } from '../utils/api';

const SubsidyManagement = () => {
  const [subsidies, setSubsidies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSubsidy, setEditingSubsidy] = useState(null);
  return (
  <div className="max-w-5xl mx-auto p-6 min-h-screen bg-black text-white dark:bg-black text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-white">Subsidy Management</h1>
        <p className="text-white">Manage and approve government subsidies</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-deep-green dark:border-green dark:text-light-green px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <button
        className="bg-gradient-primary hover:bg-deep-green text-light-green font-medium py-2 px-4 rounded-lg transition duration-300 mb-4"
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        {showCreateForm ? 'Cancel' : 'Create Subsidy'}
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreateSubsidy} className="p-6 rounded-2xl shadow-lg mb-8 bg-white text-black dark:bg-card-green dark:text-light-green">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={subsidyData.name}
              onChange={handleChange}
              placeholder="Subsidy Name"
              className="p-3 rounded-lg bg-deep-green text-light-green placeholder-green focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 dark:bg-card-green dark:text-light-green dark:placeholder-green"
              required
            />
            <input
              type="text"
              name="description"
              value={subsidyData.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-3 rounded-lg bg-deep-green text-light-green placeholder-green focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 dark:bg-card-green dark:text-light-green dark:placeholder-green"
              required
            />
            <input
              type="number"
              name="amount"
              value={subsidyData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="p-3 rounded-lg bg-deep-green text-light-green placeholder-green focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 dark:bg-card-green dark:text-light-green dark:placeholder-green"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-gradient-primary hover:bg-deep-green text-light-green font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Create Subsidy
          </button>
        </form>
      )}

      <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-light-green">
        <h2 className="text-2xl font-bold mb-4">Subsidies</h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : subsidies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-xl font-medium mb-2 text-black dark:text-light-green">No subsidies available</h3>
            <p className="mb-4 text-gray-700 dark:text-green">Create a new subsidy to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-200 dark:divide-green-800">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-black-green divide-y divide-green-200 dark:divide-green-800">
                {subsidies.map((subsidy) => (
                  <tr key={subsidy._id} className="hover:bg-card-green dark:hover:bg-deep-green transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-black dark:text-light-green">{subsidy.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green dark:text-green">{subsidy.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green dark:text-green">KES {subsidy.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        subsidy.status === 'approved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : subsidy.status === 'rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {subsidy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {subsidy.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApproveSubsidy(subsidy._id)}
                            className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded-lg mr-2 transition duration-300"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectSubsidy(subsidy._id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg transition duration-300"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubsidyManagement;