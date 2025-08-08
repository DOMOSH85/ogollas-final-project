import React, { useState, useEffect } from 'react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/government/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setAnalytics(data);
      } else {
        setError(data.message);
      }
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into regional sustainability metrics</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('weekly')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              timeRange === 'weekly' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeRange('monthly')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              timeRange === 'monthly' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setTimeRange('yearly')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              timeRange === 'yearly' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Yearly
          </button>
        </div>
        
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Farmers</h3>
          <p className="text-3xl font-bold">{analytics?.totalFarmers || 0}</p>
          <p className="text-green-100 text-sm mt-2">↑ 12% from last period</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Farmers</h3>
          <p className="text-3xl font-bold">{analytics?.totalFarmers || 0}</p>
          <p className="text-green-100 text-sm mt-2">↑ 12% from last period</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Land Parcels</h3>
          <p className="text-3xl font-bold">{analytics?.totalLands || 0}</p>
          <p className="text-blue-100 text-sm mt-2">↑ 8% from last period</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Total Area</h3>
          <p className="text-3xl font-bold">{analytics?.totalLandArea || 0} acres</p>
          <p className="text-purple-100 text-sm mt-2">↑ 5% from last period</p>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-medium mb-2">Avg Sustainability</h3>
          <p className="text-3xl font-bold">
            {analytics?.sustainabilityScores?.length > 0
              ? Math.round(analytics.sustainabilityScores.reduce((acc, score) => acc + score.count, 0) / analytics.sustainabilityScores.length)
              : 0}%
          </p>
          <p className="text-yellow-100 text-sm mt-2">↑ 3% from last period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sustainability Trends</h2>
          <div className="h-80 flex items-end justify-between pt-8">
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg h-40"></div>
              <span className="mt-2 text-gray-700 font-medium">Jan</span>
            </div>
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg h-48"></div>
              <span className="mt-2 text-gray-700 font-medium">Feb</span>
            </div>
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg h-56"></div>
              <span className="mt-2 text-gray-700 font-medium">Mar</span>
            </div>
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg h-64"></div>
              <span className="mt-2 text-gray-700 font-medium">Apr</span>
            </div>
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg h-72"></div>
              <span className="mt-2 text-gray-700 font-medium">May</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Policy Effectiveness</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Sustainable Farming Incentive</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Water Conservation Initiative</span>
                <span className="font-medium">72%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Soil Health Program</span>
                <span className="font-medium">91%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Regional Distribution</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-32 text-gray-700">North Region</div>
              <div className="flex-1 ml-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="w-10 text-right text-gray-700 font-medium">65%</div>
            </div>
            
            <div className="flex items-center">
              <div className="w-32 text-gray-700">South Region</div>
              <div className="flex-1 ml-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="w-10 text-right text-gray-700 font-medium">45%</div>
            </div>
            
            <div className="flex items-center">
              <div className="w-32 text-gray-700">East Region</div>
              <div className="flex-1 ml-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="w-10 text-right text-gray-700 font-medium">78%</div>
            </div>
            
            <div className="flex items-center">
              <div className="w-32 text-gray-700">West Region</div>
              <div className="flex-1 ml-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full" style={{ width: '52%' }}></div>
                </div>
              </div>
              <div className="w-10 text-right text-gray-700 font-medium">52%</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Recommendations</h2>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-bold text-gray-800">Increase Water Efficiency</h3>
              <p className="text-gray-600 text-sm mt-2">Implement drip irrigation systems in the South Region to reduce water usage by 30%</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h3 className="font-bold text-gray-800">Soil Health Initiative</h3>
              <p className="text-gray-600 text-sm mt-2">Promote cover cropping to improve soil organic matter in the North Region</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-bold text-gray-800">Policy Adjustment</h3>
              <p className="text-gray-600 text-sm mt-2">Extend the Sustainable Farming Incentive Program to include livestock farmers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;