const express = require("express"),
    app = express(),
    cors = require("cors"),
    http = require("http").Server(app),
    io = require("socket.io")(http),
    port = 2600;

app.use(cors())
app.use(express.static('client'));

app.get("/favicon.ico", (req, res) => {
    res.sendFile(__dirname + "/client/img/favicon.ico")
})

let clients = [], // Список подключенных сокетов (юзверей)
    chatData = {} // Хранилище данных чата

io.on("connection", (socket) => {
    clients.push(socket) // Добавляю нового юзверя в список активных подключений
    console.log("User connected")
    if (clients.length == 1) { // Если это первое подключение создаю шаблон данных
        chatData = {
            messages: {
                "id0": {
                    /*Дата устроенна в виде: порядковый номер сообщени id0, 
                                              а внутри можно получить доступ к тексту (id0.text) и к id отправлящего сокета (id0.userId)*/
                    text: "Hello Node.js + Express.js + Socket.io",
                    userId: socket.id
                }
            }
        }
    }
    socket.on('chat message', (msg) => {
        chatData.messages["id" + (Object.keys(chatData.messages).length)] = { // При получении нового сообщения добавляю его в список методом - последний id + 1
            text: msg,
            userId: socket.id
        }
        io.emit('chat message', {
            text: msg,
            userId: socket.id
        })
    })
    socket.on('disconnect', () => {
        clients.shift()
        console.log("User disconnected")
    })
})

http.listen(port, () => {
    console.log("Server started")
})