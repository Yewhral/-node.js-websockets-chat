const socket = io.connect('http://localhost:4000'); // Make connection

const message = document.getElementById('message');
const username = document.getElementById('username');
const sendButton = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emitters
sendButton.addEventListener('click', () => {
    socket.emit('chat', {
        message:message.value,
        name:username.value
    });
    message.value = '';
});

message.addEventListener('keypress', () => {
   socket.emit('typing', {
       name:username.value
   });
});


// Listeners
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
   feedback.innerHTML = '<p><em>' + data.name + ' is typing...</em></p>';
});