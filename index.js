//this file and its actions figures like server
console.log('in Server');
const path = require('path');
const express  = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//static files
//console.log(path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
});

const SocketIO = require('socket.io');
//SocketIO.listen(server);
//const io = SocketIO(server);
const io =SocketIO.listen(server);

//websockets
//1rst Linten
io.on('connection', (socket)=>{
    console.log('new connection', socket.id);
    socket.on('chat:message', (data)=>{
        console.log(data);
        //2nd Emit the message that was got
        io.sockets.emit('chat:message',data);
    });

    //3rth Listen the message
    socket.on('chat:typing', (data)=>{
        console.log(data);
        socket.broadcast.emit('chat:typing', data);
    })
});



