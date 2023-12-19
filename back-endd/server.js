const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const routes = require('./routes/routes');

const server = express();
const httpServer = http.createServer(server);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  },
});

mongoose
  .connect('mongodb://127.0.0.1:27017/est', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connectedddd!!!!!!!!!!!');

    const port = 8080;

    server.use(cors({
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
    }));

    server.use(express.json());
    server.set('io', io);

    // Event handling for Socket.IO
    io.on('connection', (socket) => {
      console.log('User connected');

      // Example: Handling 'todo_updated' event
      socket.on('todo_updated', () => {
        console.log('Received todo_updated event');
        // Broadcast to all connected clients
        io.emit('todo_updated');
      });

      // Example: Handling 'Data deleted' event
      socket.on('Data deleted', () => {
        console.log('Received Data deleted event');
        // Broadcast to all connected clients
        io.emit('Data deleted');
      });

      // Example: Handling 'Data saved' event
      socket.on('Data saved', () => {
        console.log('Received Data saved event');
        // Broadcast to all connected clients
        io.emit('Data saved');
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    server.use((req, res, next) => {
      req.io = io;
      next();
    });

    server.use(routes);

    httpServer.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/students`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });