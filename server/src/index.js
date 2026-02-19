import './config/environment.js';

import express from 'express';
import session from 'express-session';
import http from 'http';
import cors from 'cors';

import router from './routes/index.js';
import { errorHandlerMiddleware } from './middlewares/error-handler.js';
import { connect } from './config/db.js';
import { sessionConfig, sessionLog } from './config/session.js';
import { initSocket } from './socket/index.js';
import { corsConfig } from './config/cors.js';
// import { corsConfig } from './config/cors.js';

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

function onServerStart() {
  console.log(`Server listening at http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV.toUpperCase()}`);
  connect();
}

function startServer() {
  const server = http.createServer(app);
  initSocket(server);
  server.listen(PORT, onServerStart);
  return server;
}

app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cors(corsConfig),
  session(sessionConfig),
  sessionLog,
  router,
  errorHandlerMiddleware,
]);

app.set('trust proxy', 1);

export { startServer };
