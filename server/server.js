const express = require("express");
const io = require("socket.io")(3001, {
    cors: {
        origin: "http://localhost:3002",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("get-room", (room) => {
        console.log(`connected ${room}`)
        socket.join(room);
        socket.on("send-changes", (hostInput) => {
            socket.broadcast.to(room).emit("receive-changes", hostInput);
        });
        socket.on("send-timer-change", (timerStatusChange) => {
            socket.broadcast.to(room).emit("receive-timer-change", timerStatusChange);
        })
        socket.on("send-result", (result) => {
            socket.broadcast.to(room).emit("receive-result", result);
        })
    });
});

app = express();