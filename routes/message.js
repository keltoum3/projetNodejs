// Import
const express = require('express');
const messageController = require('../controllers/message');
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator/check');

// Create router
const router = express.Router();


// Router redirect
router.delete('/message/:id', isAuth, messageController.deleteMessage);
router.get('/message',isAuth, messageController.getMessage);

//Send message (to db, no sender and mail to yet) with minimum length of title and message of 5
//with check of authentication/token
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
    messageController.updateMessage
);




// Export modules
module.exports = router;
