// src/socket/handlers.js

import { registerEvents } from './events.js';

export function registerHandlers(socket) {
  console.log('Client connected:', socket.id);

  registerEvents(socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
}
