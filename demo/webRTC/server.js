var app = require('http').createServer()
var io = require('socket.io')(app);
var count = 0;
var videoBuffer = [];

app.listen(8989);

io.on('connection', function (socket) {

    // socket.emit('getVideoData', { 'data': 'data.video' });
    
    socket.on('sendVideoData', function (data) {
        console.log("500一次",data.video)
        io.sockets.emit('getVideoData', { data: data.video });
    });
}); 
      