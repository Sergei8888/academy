const express = require("express"),
    app = express(),
    cors = require("cors"),
    http = require('http').createServer(app),
    io = require("socket.io")(http)
port = 2600;

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello")
})

io.on("connection", (socket) => {
    console.log("connected")
})

app.listen(port, () => {
    console.log("Server started")
})