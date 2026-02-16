import { useEffect, useState } from 'react';
import { socket } from '../lib/socket';

export function useSocket() {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected:', socket.id);
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
      setConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
      setConnected(false);
    };
  }, []);

  return { socket, connected };
}
