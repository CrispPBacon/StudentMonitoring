import './config/environment.js';

import express from 'express';
import router from './routes/index.js';
import { errorHandlerMiddleware } from './middlewares/error-handler.js';

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

async function onServerStart() {
  console.log(`Server listening at http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV.toUpperCase()}`);
}

function startServer() {
  app.listen(PORT, onServerStart);
  return app;
}

app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  router,
  errorHandlerMiddleware,
]);

app.set('trust proxy', 1);

export { startServer };
