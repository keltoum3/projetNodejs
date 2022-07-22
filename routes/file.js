const express = require('express');
const { body } = require('express-validator/check');
const fileController = require('../controllers/file');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//file/getAll
router.get('/getAll', isAuth, fileController.getFiles);

//file/upload
router.post(
    '/upload',
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 })
    ],
    isAuth,
    fileController.uploadFile
);

// GET /file/get/:id
router.get('/get/:fileId', isAuth, fileController.getFile);

module.exports = router;
