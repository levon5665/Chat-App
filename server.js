var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3099;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

io.on('connection', function (socket) {
    var addedUser = false;

    socket.on('new message', function (data) {
        socket.broadcast.emit('new message', {
            type: data.type,
            user: data.user,
            msg: data.msg,
            date:data.date
        });
    });

    socket.on('add user', function (user) {
        if (addedUser) return;
        socket.username = user;
        addedUser = true;

        socket.emit('login', {
            username: user
        });

        socket.broadcast.emit('user joined', {
            user: user,
            message: user.name + ' has joined to the chat'
        });
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', {
            user:data
        });
    });

    socket.on('stop typing', function () {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    socket.on('left chat', function (data) {
        socket.emit('to disconnect', {
            user: data,
            message: data.name + ' left the chat'
        });
    });

    socket.on('disconnect', function (socket) {
        if (addedUser) {

            if(socket.broadcast){
                socket.broadcast.emit('user left', {
                    username: socket.username
                });
            }
        }
    });
});