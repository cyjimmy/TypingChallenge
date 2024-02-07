// Import required modules
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Initialize Express app and create an HTTP server
const app = express();
const server = http.createServer(app);

// Create a Socket.IO server by passing the HTTP server
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});

// Define a connection event handler for Socket.IO
io.on('connection', (socket) => {
    console.log('A client connected');

    // Handle events when a client sends a message
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Broadcast the received message to all connected clients
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Set up a basic route for the HTTP server
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Define the port number for the server
const PORT = process.env.PORT || 8080;

// Start the server and listen on the defined port
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
