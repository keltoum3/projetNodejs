const { validationResult } = require('express-validator/check');

const Post = require('../models/files');

exports.getFiles = (req, res, next) => {
    Post.find()
        .then(posts => {
            res
                .status(200)
                .json({ message: 'Fetched files successfully.', posts: posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.uploadFile = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.image;
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl
    });
    post
        .save()
        .then(result => {
            res.status(201).json({
                message: 'File uploaded successfully!',
                post: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getFile = (req, res, next) => {
    const postId = req.params.fileId;
    Post.findById(postId)
        .then(file => {
            if (!file) {
                const error = new Error('Could not find post.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'File fetched.', file: file });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
