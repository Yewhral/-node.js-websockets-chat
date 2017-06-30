const socket = io.connect('http://localhost:4000'); // Make connection

const message = document.getElementById('message');
const username = document.getElementById('username');
const sendButton = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');


const sendMessage = () => {
    if (message.value.length > 0 && username.value.length > 0) {
        socket.emit('chat', {
            message: message.value,
            name: username.value
        });
        message.value = '';
    } else {
        alert('Don\'t send messages without content or your name!');
    }
};

// Emitters
sendButton.addEventListener('click', () => {
  sendMessage();
});

message.addEventListener('keypress', () => {
   socket.emit('typing', {
       name:username.value
   });
});


const getTime = () => {
  let timeNow = new Date();
  let hh = timeNow.getHours();
  let mm = timeNow.getMinutes();
  let ss = timeNow.getSeconds();

    if(hh < 10) {
        hh = '0' + hh
    }
    if(mm < 10) {
        mm = '0' + mm
    }
    if(ss < 10) {
        ss = '0' + ss
    }
    timeNow = '[' + hh + ':' + mm + ':' + ss + ']';
    return timeNow;
};

// Listeners
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p> '+ getTime() + ' <strong>' + data.name + ': </strong>' + data.message + '</p>';
});

socket.on('typing', (data) => {
   feedback.innerHTML = '<p><em>' + data.name + ' is typing...</em></p>';
});