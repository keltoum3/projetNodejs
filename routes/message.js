// Import all
const express = require('express');
const messageController = require('../controllers/message');

// Create router
const router = express.Router();

// Router redirect
router.post('/message', messageController.sendMessage);

// Export modules
module.exports = router;
