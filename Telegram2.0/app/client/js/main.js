const url = 'http://localhost:2600',
    messageSendingForm = document.getElementById('messageSendingForm'),
    messageInput = document.getElementById('messageInput'),
    dialog = document.getElementById("dialog")

const socket = io(url);

messageSendingForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (messageInput.value) {
        socket.emit('chat message', messageInput.value)
        messageInput.value = ''
    }
})

function renderMessage(msg) {
    // Отрисовка
    let messageBlock = document.createElement("div")
    messageBlock.className = "message"
    messageBlock.innerText = msg.text
    dialog.append(messageBlock)

    // Принадлежность сообщения юзверю
    if (msg.userId === socket.id) {
        messageBlock.classList.add("message--mine")
    } else {
        messageBlock.classList.add("message--not-mine")
    }
}

socket.on('chat message', (msg) => {
    renderMessage(msg)

})