// Import all
const express = require('express');
const messageController = require('../controllers/message');

// Create router
const router = express.Router();

// Router redirect
router.post('/message', messageController.sendMessage);
router.get('/message', messageController.getMessage);

// Export modules
module.exports = router;
