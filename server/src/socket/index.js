import { Server } from 'socket.io';
import { registerHandlers } from './handlers.js';

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // your React app
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    registerHandlers(socket);
  });
}

// Optional: export io instance to emit from anywhere
export function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}
