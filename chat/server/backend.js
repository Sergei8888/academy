const express = require("express"),
    server = express(),
    port = 2600

server.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>")
})

server.listen(port)