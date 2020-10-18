const express = require("express"),
  app = express(),
  socket = require("socket.io"),
  port = process.env.PORT || 3000;

app.use(express.static("public"));

const io = socket(
  app.listen(port, () => console.log(`server's listening on port ${port}`))
);

io.on("connection", socket => {
  console.log("a new socket connection:", socket.id);

  socket.on("sent", data => {
    io.sockets.emit("sent", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
