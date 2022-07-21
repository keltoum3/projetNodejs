// Import all
const express = require('express');
const bodyParser = require('body-parser');
const messageRoute = require('./routes/message');
const mongoose = require('mongoose');

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

// Router redirect
app.use('/topic', messageRoute);


mongoose.connect(
        'mongodb+srv://keltoum:230396@cluster0.nnnr6m0.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(result => {
      app.listen(8080);
    })
    .catch(err => console.log(err));
