// Import all
import * as assert from "assert";
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};;
import messageRoute from './routes/message.js';
import bodyParser from "body-parser";


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
        'mongodb+srv://keltoum:230396@cluster0.nnnr6m0.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(result => {
      app.listen(8080);
    })
    .catch(err => console.log(err));
