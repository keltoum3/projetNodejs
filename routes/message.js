// Import all
const express = require('express');
const messageController = require('../controllers/message');
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator/check');

// Create router
const router = express.Router();


router.delete('/message/:id', isAuth, messageController.deleteMessage);

// Router redirect
router.get('/message',isAuth, messageController.getMessage);

router.post(
    '/message',
    isAuth,
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('message')
            .trim()
            .isLength({ min: 5 })
    ],
    messageController.sendMessage
);

router.put(
    '/message/:id',
    isAuth,
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('message')
            .trim()
            .isLength({ min: 5 })
    ],
    messageController.updatePost
);




// Export modules
module.exports = router;
