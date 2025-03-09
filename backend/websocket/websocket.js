const socketIo = require("socket.io");

let io;
const initSocket = (server) => {
  io = socketIo(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("placeBid", (data) => {
      io.emit("newBid", data); // Broadcast the bid update to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = { initSocket, io };
