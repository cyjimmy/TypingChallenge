const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8080;

const io = require("socket.io")(3001, {
  cors: {
    origin: "https://jimmy-typingchallenge.herokuapp.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.send("Hello!");
  socket.on("get-room", (room) => {
    console.log(`connected ${room}`);
    socket.join(room);
    socket.on("send-changes", (hostInput) => {
      socket.broadcast.to(room).emit("receive-changes", hostInput);
    });
    socket.on("send-timer-change", (timerStatusChange) => {
      socket.broadcast.to(room).emit("receive-timer-change", timerStatusChange);
    });
    socket.on("send-result", (result) => {
      socket.broadcast.to(room).emit("receive-result", result);
    });
  });
});

app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
});
