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
  <div className="animate-fadeIn min-h-screen p-4 bg-white dark:bg-black-green">
      <div className="mb-8">
  <h1 className="text-3xl font-bold mb-2 text-black dark:text-light-green">Analytics Dashboard</h1>
  <p className="text-gray-700 dark:text-green">Comprehensive insights into regional sustainability metrics</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-deep-green dark:border-green dark:text-light-green px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('weekly')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              timeRange === 'weekly' 
                ? 'bg-gradient-primary text-light-green' 
                : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-card-green dark:text-green dark:hover:bg-deep-green'
            }`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeRange('monthly')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              timeRange === 'monthly' 
                ? 'bg-gradient-primary text-light-green' 
                : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-card-green dark:text-green dark:hover:bg-deep-green'
            }`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setTimeRange('yearly')}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              timeRange === 'yearly' 
                ? 'bg-gradient-primary text-light-green' 
                : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-card-green dark:text-green dark:hover:bg-deep-green'
            }`}
          >
            Yearly
          </button>
        </div>
        <button className="bg-gradient-primary hover:bg-deep-green text-light-green font-medium py-2 px-4 rounded-lg transition duration-300">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-2xl shadow-lg bg-gray-100 text-black dark:bg-gradient-primary dark:text-light-green">
          <h3 className="text-lg font-medium mb-2">Total Farmers</h3>
          <p className="text-3xl font-bold">{analytics?.totalFarmers || 0}</p>
          <p className="text-green text-sm mt-2">↑ 12% from last period</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-gray-100 text-black dark:bg-gradient-primary dark:text-light-green">
          <h3 className="text-lg font-medium mb-2">Total Farmers</h3>
          <p className="text-3xl font-bold">{analytics?.totalFarmers || 0}</p>
          <p className="text-green text-sm mt-2">↑ 12% from last period</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-green">
          <h3 className="text-lg font-medium mb-2">Total Land Parcels</h3>
          <p className="text-3xl font-bold">{analytics?.totalLands || 0}</p>
          <p className="text-light-green text-sm mt-2">↑ 8% from last period</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-green">
          <h3 className="text-lg font-medium mb-2">Total Area</h3>
          <p className="text-3xl font-bold">{analytics?.totalLandArea || 0} acres</p>
          <p className="text-light-green text-sm mt-2">↑ 5% from last period</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-green">
          <h3 className="text-lg font-medium mb-2">Avg Sustainability</h3>
          <p className="text-3xl font-bold">
            {analytics?.sustainabilityScores?.length > 0
              ? Math.round(analytics.sustainabilityScores.reduce((acc, score) => acc + score.count, 0) / analytics.sustainabilityScores.length)
              : 0}%
          </p>
          <p className="text-light-green text-sm mt-2">↑ 3% from last period</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-light-green">
          <h2 className="text-2xl font-bold mb-4">Sustainability Trends</h2>
          <div className="h-80 flex items-end justify-between pt-8">
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-primary rounded-t-lg h-40"></div>
              <span className="mt-2 text-green font-medium">Jan</span>
            </div>
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-primary rounded-t-lg h-48"></div>
              <span className="mt-2 text-green font-medium">Feb</span>
            </div>
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-primary rounded-t-lg h-56"></div>
              <span className="mt-2 text-green font-medium">Mar</span>
            </div>
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-primary rounded-t-lg h-64"></div>
              <span className="mt-2 text-green font-medium">Apr</span>
            </div>
            <div className="flex flex-col items-center flex-1 px-2">
              <div className="w-full bg-gradient-primary rounded-t-lg h-72"></div>
              <span className="mt-2 text-green font-medium">May</span>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-light-green">
          <h2 className="text-2xl font-bold mb-4">Policy Effectiveness</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-green">Sustainable Farming Incentive</span>
                <span className="font-medium text-light-green">85%</span>
              </div>
              <div className="h-2 bg-deep-green rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-green">Water Conservation Initiative</span>
                <span className="font-medium text-light-green">72%</span>
              </div>
              <div className="h-2 bg-deep-green rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-green">Soil Health Program</span>
                <span className="font-medium text-light-green">91%</span>
              </div>
              <div className="h-2 bg-deep-green rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-light-green">
          <h2 className="text-2xl font-bold mb-4">Regional Distribution</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-32 text-green">North Region</div>
              <div className="flex-1 ml-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-deep-green">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="w-10 text-right font-medium text-black dark:text-light-green">65%</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-green">South Region</div>
              <div className="flex-1 ml-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-deep-green">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="w-10 text-right font-medium text-black dark:text-light-green">45%</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-green">East Region</div>
              <div className="flex-1 ml-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-deep-green">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="w-10 text-right font-medium text-black dark:text-light-green">78%</div>
            </div>
            <div className="flex items-center">
              <div className="w-32 text-green">West Region</div>
              <div className="flex-1 ml-4">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-deep-green">
                  <div className="h-full bg-gradient-primary rounded-full" style={{ width: '52%' }}></div>
                </div>
              </div>
              <div className="w-10 text-right font-medium text-black dark:text-light-green">52%</div>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-white text-black dark:bg-card-green dark:text-light-green">
          <h2 className="text-2xl font-bold mb-4">Recent Recommendations</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-green dark:bg-deep-green">
              <h3 className="font-bold text-green">Increase Water Efficiency</h3>
              <p className="text-gray-800 text-sm mt-2 dark:text-light-green">Implement drip irrigation systems in the South Region to reduce water usage by 30%</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-green dark:bg-deep-green">
              <h3 className="font-bold text-green">Soil Health Initiative</h3>
              <p className="text-gray-800 text-sm mt-2 dark:text-light-green">Promote cover cropping to improve soil organic matter in the North Region</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg border-l-4 border-green dark:bg-deep-green">
              <h3 className="font-bold text-green">Policy Adjustment</h3>
              <p className="text-gray-800 text-sm mt-2 dark:text-light-green">Extend the Sustainable Farming Incentive Program to include livestock farmers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;