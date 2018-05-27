//This file figures like client

//next variable will add the name host that we have to connect
//example: const socket = io('http://site.com.mx/sas')
const socket = io()

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//when ckick on the button
btn.addEventListener('click', function(){
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
    console.log({
        username: username.value,
        message: message.value
    })
});

//in message input when we type something , we emit the user  to all
message.addEventListener('keypress',function(){
    socket.emit('chat:typing', username.value);
});

//for emit someone action
socket.on('chat:message', function(data){
    actions.innerHTML='';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
        </p>`
});

//for emit someone action
socket.on('chat:typing', function(data){
    actions.innerHTML=`<p><em>${data} is typing a message </em> </p>`
});