import express from 'express';
import {
  authLogin,
  authLogout,
  authSignup,
  refreshAuth,
} from '#controllers/auth.controller.js';
import { assertNoActiveSession } from '#middlewares/auth-handler.js';

const router = express.Router();

// router.route('/auth').get((req, res) => res.send('LOGIN PAGE'));
router
  .route('/auth/login')
  .get(refreshAuth)
  .post(assertNoActiveSession, authLogin);
router.route('/auth/logout').delete(authLogout);
router.route('/auth/signup').post(assertNoActiveSession, authSignup);
export default router;
