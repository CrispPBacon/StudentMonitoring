import { getLocalIPv4 } from '../utils/getIPAddress.js';

const localIP = getLocalIPv4();
const whitelist = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', `http://${localIP}:5173`];

console.log(whitelist);
export const corsConfig = {
  origin: (origin, callback) => {
    // ? Allow requests with no origin (like mobile apps or curl)
    if (!origin || whitelist.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS: Not allowed by CORS policy'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200, // ? For legacy browser support
};
