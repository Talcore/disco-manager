var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var currentsong = {song: "Example Song", artist: "Example Artist", albumart: "samplealbum"};
var currentinformation = "Example Information";

app.get('/', function(req, res){
  res.sendFile(__dirname + '/screen.html');
});

app.get('/control', function(req, res){
  res.sendFile(__dirname + '/control.html');
});

app.use(express.static('album_arts'));

io.on('connection', function(socket){
  console.log('Incoming connection');
  var type = '';
  //send current screeninfo to new connected screen
  socket.emit('now song changed', currentsong);
  socket.emit('information changed', currentinformation);

  socket.on('type', function(msg){
    type = msg;
    console.log(msg + ' connected')
  });

  socket.on('disconnect', function(){
    console.log(type + ' disconnected');
  });

  socket.on('change now song', function(msg){
    currentsong = msg;
    console.log('Now Song changed to ' + msg.song + ' from ' + msg.artist);
    io.emit('now song changed', msg);
  });

  socket.on('change next song', function(msg){
    console.log('Next Song changed to ' + msg.song + ' from ' + msg.artist);
    io.emit('next song changed', msg);
  });

  socket.on('change information', function(msg){
    currentinformation = msg;
    console.log('Information changed to ' + msg);
    io.emit('information changed', msg);
  });
});

http.listen(8888, function(){
  console.log('Listening on port 8888');
});
