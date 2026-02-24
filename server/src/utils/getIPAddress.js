import os from 'os';

export function getLocalIPv4() {
  const interfaces = os.networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (
        net.family === 'IPv4' &&
        !net.internal &&
        net.address.startsWith('192.168.')
      ) {
        return net.address;
      }
    }
  }

  return 'localhost';
}
