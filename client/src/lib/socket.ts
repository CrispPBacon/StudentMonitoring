import { io, Socket } from 'socket.io-client';
import { backendUrl } from './api';

export const socket: Socket = io(backendUrl, {
  autoConnect: false, // prevents auto-connecting
});
