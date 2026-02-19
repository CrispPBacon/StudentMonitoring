export function registerEvents(socket) {
  // Ping-Pong test
  socket.on('ping', (data) => {
    socket.emit('pong', 'Server received ping');
    console.log(data);
    // RETURNER
  });

  // socket.on('attendance', (data) => {
  //   console.log('FROM SOCKET:', data);

  //   socket.emit('attendanceListen', 'DONE');
  // });

  // Broadcast messages
  socket.on('sendMessage', (msg) => {
    socket.broadcast.emit('newMessage', msg);
  });
}
