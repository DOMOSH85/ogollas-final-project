import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { governmentAPI } from '../utils/api';
import SubsidyManagement from './SubsidyManagement';
import Messaging from './Messaging';

const GovernmentDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await governmentAPI.getAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError('Failed to fetch analytics');
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Government Dashboard</h1>
        <p className="text-gray-600">Monitor regional sustainability and policy effectiveness</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Farmers</h3>
          <p className="text-3xl font-bold">{analytics?.totalFarmers || 0}</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Land Parcels</h3>
          <p className="text-3xl font-bold">{analytics?.totalLands || 0}</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Area</h3>
          <p className="text-3xl font-bold">{analytics?.totalLandArea || 0} acres</p>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Avg Sustainability</h3>
          <p className="text-3xl font-bold">
            {analytics?.sustainabilityScores?.length > 0 
              ? Math.round(analytics.sustainabilityScores.reduce((acc, score) => acc + score.count, 0) / analytics.sustainabilityScores.length)
              : 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sustainability Score Distribution</h2>
          <div className="h-64 flex items-end justify-between pt-8">
            {analytics?.sustainabilityScores?.map((score, index) => (
              <div key={index} className="flex flex-col items-center flex-1 px-2">
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-blue-500 rounded-t-lg"
                  style={{ height: `${(score.count / Math.max(...analytics.sustainabilityScores.map(s => s.count))) * 200}px` }}
                ></div>
                <span className="mt-2 text-gray-700 font-medium">{score._id}</span>
                <span className="text-gray-500 text-sm">{score.count}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Soil Type Distribution</h2>
          <div className="space-y-4">
            {analytics?.soilDistribution?.map((soil, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 text-gray-700">{soil._id}</div>
                <div className="flex-1 ml-4">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                      style={{ width: `${(soil.count / Math.max(...analytics.soilDistribution.map(s => s.count))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-10 text-right text-gray-700 font-medium">{soil.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Policies</h2>
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
              Create Policy
            </button>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
              <h3 className="font-bold text-gray-800">Sustainable Farming Incentive Program</h3>
              <p className="text-gray-600 text-sm mt-2">Provides subsidies for farmers using sustainable practices</p>
              <div className="flex justify-between items-center mt-3">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Active
                </span>
                <span className="text-gray-500 text-xs">Effective: Jan 2023</span>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
              <h3 className="font-bold text-gray-800">Water Conservation Initiative</h3>
              <p className="text-gray-600 text-sm mt-2">Mandates water usage tracking for all agricultural operations</p>
              <div className="flex justify-between items-center mt-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Draft
                </span>
                <span className="text-gray-500 text-xs">Proposed: Mar 2023</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Reports</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <span className="text-blue-600">📊</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Quarterly Sustainability Report</h3>
                <p className="text-gray-600 text-sm">Regional analysis of sustainability metrics</p>
                <p className="text-gray-500 text-xs mt-1">Updated: 2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <span className="text-green-600">🌱</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Soil Health Assessment</h3>
                <p className="text-gray-600 text-sm">Comprehensive soil quality analysis</p>
                <p className="text-gray-500 text-xs mt-1">Updated: 1 week ago</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-lg mr-4">
                <span className="text-purple-600">💧</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Water Usage Report</h3>
                <p className="text-gray-600 text-sm">Regional water consumption patterns</p>
                <p className="text-gray-500 text-xs mt-1">Updated: 3 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subsidy Management Section */}
      <div className="mt-8">
        <SubsidyManagement />
      </div>
      
      {/* Messaging Section */}
      <div className="mt-8">
        <Messaging userType="government" />
      </div>
    </div>
  );
};

export default GovernmentDashboard;