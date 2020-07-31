const socket = io(`http://localhost:8000`); // Must To Do
//ToDo:  Getting DOM elements in respective js variables 
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
//ToDo: Audio which will play on receiving messages
var audio = new Audio('ting.mp3');

// position is left and right one
//ToDo:  Function that will append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(`message`);
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position = 'left') {
        audio.play();
    };
};

//ToDo: Ask new user for His/Her name and let the server know
const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

//ToDo:  IF the new user join, receive His/Her name from the server 
socket.on('user-joined', data => {
    append(`${name} joined the chat`, `right`);
});

//ToDo: if server sends a message, receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, `left`);
});

//ToDo: if a user leaves the chat, append the info to the container 
socket.on('leave', name => {
    append(`${name} left the Chat`, `right`);
});

//ToDo:  if the form gets submitted , send a message to the server 
form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";
});