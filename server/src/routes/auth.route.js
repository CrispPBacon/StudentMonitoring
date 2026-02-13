import express from 'express';
import {
  AuthLogin,
  AuthLogout,
  AuthSignup,
} from '../controllers/auth.controller.js';
import {
  validateLogin,
  validateSignUp,
} from '../middlewares/validations/validation.js';

const router = express.Router();

// router.route('/auth').get((req, res) => res.send('LOGIN PAGE'));
router.route('/auth/login').post(validateLogin, AuthLogin);
router.route('/auth/logout').delete(AuthLogout);
router.route('/auth/signup').post(validateSignUp, AuthSignup);
export default router;
