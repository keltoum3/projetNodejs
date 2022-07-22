// Import all
const express = require('express');
const bodyParser = require('body-parser');
const messageRoute = require('./routes/message');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const fileRoute = require('./routes/file');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require("path");
//used for uploading files
const multer = require("multer");
//module that loads environment variables from a .env file into process.env
require('dotenv').config();

// Create app
const app = express();


// Parse body
app.use(bodyParser.json());

// Response header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//store the file
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

//filter on the extension of files
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Router redirect
app.use('/topic', messageRoute);
app.use('/auth', authRoutes);
app.use('/file', fileRoute);

//swagger doc to check endPoint
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

//Connect to db on port 8088
mongoose.connect(
    process.env.URLMONGO )
    .then(result => {
      app.listen(8080);
    })
    .catch(err => console.log(err));

