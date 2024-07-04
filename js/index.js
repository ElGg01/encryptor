const textArea = document.querySelector("#data-text");
const cardContent = document.querySelector("#card-content");

const emptyCard = cardContent.innerHTML;

function updateResult() {
    if (textArea.value != "") {
        console.log(textArea.value);
        cardContent.innerHTML = '<img src="assets/writting.gif" alt="" />'
        cardContent.innerHTML += "<h2>Escribiendo...</h2>"
    } else {
        cardContent.innerHTML = emptyCard;
    }
}

textArea.addEventListener('keyup', updateResult);

let pattern = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
}

function reverseObject(obj){
    let reverseObj = {}
    for(let key in obj){
        reverseObj[obj[key]] = key;
    }
    return reverseObj;
}

reversePattern = reverseObject(pattern);

function encrypt(text, pattern) {
    if(text == "") return

    let characters = [...text]
    let encryptedText = ""

    characters.forEach(character => {
        if (character in pattern) {
            encryptedText += pattern[character];
        } else {
            encryptedText += character;
        }
    });

    cardContent.innerHTML = '<img src="assets/happy.gif" alt="" />'
    cardContent.innerHTML += `<h2>Texto encriptado:</h2>`;
    cardContent.innerHTML += `<p>${encryptedText}</p>`;
    cardContent.innerHTML += `<button class="copy-button" onclick='copyToClipboard("${encryptedText}")'>Copiar</button>`;
}

function decrypt(text, pattern) {
    if(text == "") return

    for(key in pattern){
        while (text.includes(key)) {
            text = text.replace(key, pattern[key]);
        }
    }

    cardContent.innerHTML = '<img src="assets/happy.gif" alt="" />'
    cardContent.innerHTML += `<h2>Texto desencriptado:</h2>`;
    cardContent.innerHTML += `<p>${text}</p>`;
    cardContent.innerHTML += `<button class="copy-button" onclick='copyToClipboard("${text}")'>Copiar</button>`;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Content copied to clipboard');
    } catch (error) {
        console.error('Failed to copy: ', error);
    }
}