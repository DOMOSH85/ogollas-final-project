const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');
const { protect } = require('../middleware/authMiddleware');

// Create a new policy (government only)
router.post('/', protect, policyController.createPolicy);

// Get all policies
router.get('/', protect, policyController.getPolicies);

module.exports = router;
