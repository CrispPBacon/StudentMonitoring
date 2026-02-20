import { io, Socket } from 'socket.io-client';
export const backendUrl = `${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}`;

console.log(backendUrl);
export const socket: Socket = io(backendUrl, {
  autoConnect: false, // prevents auto-connecting
});
