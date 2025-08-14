const Policy = require('../models/Policy');

// Create a new policy
exports.createPolicy = async (req, res) => {
  try {
    const { title, description, status, effectiveDate } = req.body;
    const policy = new Policy({
      title,
      description,
      status: status || 'Draft',
      effectiveDate,
      createdBy: req.user._id
    });
    await policy.save();
    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create policy', error: err.message });
  }
};

// Get all policies
exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().populate('createdBy', 'name email');
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch policies', error: err.message });
  }
};
