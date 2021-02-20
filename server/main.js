console.log("Hello world")
const { text } = require("body-parser");
const { response } = require("express");
const express = require("express"),
    app = express(),
    cors = require("cors");

app.use(cors())

app.get("/", function(request, response) {
    var x = "Не купить";
    response.send({ foo: x });
});

app.listen(591);