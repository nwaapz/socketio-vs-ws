const port = 8080;
const io = require('socket.io')();
io.use((socket, next) => {
    console.log("using socket");
    if (socket.handshake.query.token === "UNITY") {
        next();
    } else {
        next(new Error("Authentication error"));
    }
});

io.on('connection', socket => {
    console.log("connection open");
  socket.emit('connection', {date: new Date().getTime(), data: "Hello Unity"})

  socket.on('hello', (data) => {
    socket.emit('hello', {date: new Date().getTime(), data: data});
  });

  socket.on('spin', (data) => {
    socket.emit('spin', {date: new Date().getTime()});
  });

  socket.on('class', (data) => {
    socket.emit('class', {date: new Date().getTime(), data: data});
  });
});

io.listen(port);
console.log('listening on *:' + port);