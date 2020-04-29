const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
    return res.send("pong");
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = require("http").createServer(express);
const io = require("socket.io").listen(server);

io.sockets.on("connection", (socket, pseudo) => {
    console.log("[io    ] new client connected");
    socket.on("message", (message) => {
        console.log("[io    ] received ", message);
        socket.broadcast.emit("message", message);
    });
});

app.listen(process.env.PORT || 8080);

console.log("[server] started on port 8080");
