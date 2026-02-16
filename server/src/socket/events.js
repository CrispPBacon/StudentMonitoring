export function registerEvents(socket) {
  // Ping-Pong test
  socket.on('ping', () => {
    socket.emit('pong', 'Server received ping');
  });

  // Broadcast messages
  socket.on('sendMessage', (msg) => {
    socket.broadcast.emit('newMessage', msg);
  });
}
