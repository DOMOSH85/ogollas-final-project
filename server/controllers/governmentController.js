const Land = require('../models/Land');
const User = require('../models/User');

// Get analytics data for government dashboard
const getAnalytics = async (req, res) => {
  try {
    // Total farmers
    const totalFarmers = await User.countDocuments({ role: 'farmer' });

    // Total land parcels
    const totalLands = await Land.countDocuments();

    // Total land area
    const landAreas = await Land.aggregate([
      {
        $group: {
          _id: null,
          totalArea: { $sum: '$size' }
        }
      }
    ]);

    // Land distribution by soil type
    const soilDistribution = await Land.aggregate([
      {
        $group: {
          _id: '$soilType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Sustainability score distribution
    const sustainabilityScores = await Land.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lt: ['$sustainabilityScore', 30] }, then: 'Low' },
                { case: { $lt: ['$sustainabilityScore', 70] }, then: 'Medium' },
                { case: { $lte: ['$sustainabilityScore', 100] }, then: 'High' }
              ]
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalFarmers,
      totalLands,
      totalLandArea: landAreas.length > 0 ? landAreas[0].totalArea : 0,
      soilDistribution,
      sustainabilityScores
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all farmers (for government to view)
const getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: 'farmer' }).select('-password');
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all land parcels (for government to view)
const getAllLands = async (req, res) => {
  try {
    const lands = await Land.find().populate('farmer', 'name email location');
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAnalytics,
  getAllFarmers,
  getAllLands
};