const express = require('express');
const server = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose
  .connect('mongodb://127.0.0.1:27017/est', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected !!!!!!!!!!!');
    server.use(cors());
    server.use(express.json());
    server.use(routes);

    server.listen(8000, (error) => {
      if (error) {
        console.log('Error starting the server:', error);
      } else {
        console.log('Server started successfully!');
      }
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
