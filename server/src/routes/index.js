import express from 'express';
import path from 'path';

import auth from './auth/index.js';
import { ROOT_DIR } from '../utils/directory.js';

const router = express.Router();

router.use(
  '/uploads',
  express.static(path.join(ROOT_DIR, '..', '..', 'uploads'))
);

router.use('/api', auth);

export default router;
