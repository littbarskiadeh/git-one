const express = require('express');
const socket = require('socket.io');//returns a function socket()

// App setup
//invoke imported function express()
const app = express();

// create server on port 4000
const server = app.listen(4000, ( ) => {
    console.log( 'listening on port 4000');
});
// to serve something to the browser
// Serve static files in 'public' folder- (http://localhost:4000/index.html)

// Static files
app.use(express.static('public'));

// Socket setup - setup socket on server side
var io = socket(server);

//listen for connection from browser
    //socket-- each client instance connected 
    //next set socket.io on index.html
io.on('connection', (socket) => {
    console.log('made socket connection ', socket.id);

    socket.on('chat', (data) => {//data is {}object sent from client
        //io.sockets returns all socket connections on the port
            //emit(data) sends the data to all sockets
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);//review socket.broadcast
    })
});
