var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(requ, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Screen connected');
  socket.on('disconnect', function(){
    console.log('Screen disconnected');
  });

  socket.on('change next song', function(msg){
    console.log('Next Song changed to ' + msg);
    io.emit('next song changed', msg);
  });
});

http.listen(8888, function(){
  console.log('Listening on port 8888');
});
