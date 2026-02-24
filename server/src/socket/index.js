import { Server } from 'socket.io';
import { registerHandlers } from './handlers.js';
import { getLocalIPv4 } from '../utils/getIPAddress.js';

let io;
const localIP = getLocalIPv4();
const whitelist = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', `http://${localIP}:${5173}`];

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: whitelist, // your React app
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
