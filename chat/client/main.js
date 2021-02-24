const url = 'localhost:2600/',
    block = document.getElementById('test');

async function getInfo() {
    let response = await fetch('url')
    let results = await response.text();

    return results;
}

let results = getInfo()