const { validationResult } = require('express-validator/check');
const Message = require('../models/message');
// Function for send message
exports.sendMessage = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        });
    }
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    //Create a message from element of th request
    const title = req.body.title;
    const message = req.body.message;
    const messageSchema = new Message({
        title: title,
        message: message,
        imageUrl: imageUrl,
    });
    //Save the message in database
    messageSchema
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: result
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getMessage = (req, res, next) => {
    Message.find().select(['title', 'message'])
        .then(messages => {
            res
                .status(200)
                .json({ log: 'Fetched message successfully.', message: messages });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteMessage = (req, res, next) => {
    const messageId = req.params.id;
    console.log('req.params.id: ', req.params.id)
    Message.findById(messageId)
        .then(message => {
            if (!message) {
                const error = new Error('Could not find message.');
                error.statusCode = 404;
                throw error;
            }
            return Message.findByIdAndRemove(messageId);
        })
        .then(result => {
            console.log(result);
            res.status(200).json({ message: 'Deleted message.' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updatePost = (req, res, next) => {
    const messageId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const message = req.body.message;
    Message.findById(messageId)
        .then(obj => {
            if (!obj) {
                const error = new Error('Could not find message.');
                error.statusCode = 404;
                throw error;
            }
            obj.title = title;
            obj.message = message;
            return obj.save();
        })
        .then(result => {
            res.status(200).json({ log: 'Message updated!', message: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

