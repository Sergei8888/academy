const url = 'http://localhost:2600'
let firstIteration = true

async function updating() {
    let getRequest = $.get(url + "/data.json")
    getRequest.done((data) => {
        let i = 0
        while (i != data.messages.length) {
            if (data.messages[i].rendered == "false") {
                data.messages[i].rendered = false
            } else {
                data.messages[i].rendered = true
            }
            i += 1
        }
        i = 0
        while (i != data.messages.length) {
            if (data.messages[i].rendered) {
                if (data.messages[i].text != $(".message")[i].innerText) {
                    $(".message")[i].innerText = data.messages[i].text
                }
            } else {
                $("#test").append("<div class='message'>" + data.messages[i].text + "</div>")
                console.log(data.messages[i].rendered, i)
                data.messages[i].rendered = true
                console.log(data.messages[i].rendered, i)
            }
            if (i == data.messages.length - 1) {
                let postRequest = $.post(url + "/dataPost", { data })
                postRequest.done((data) => {
                    console.log("JSON sent")
                })
            }
            i += 1
        }
    })
}

updating() //Первая отрисовка

let updateTimer = setInterval(updating, 5000)