import express from 'express';
import {
  authLogin,
  authLogout,
  authSignup,
} from '../controllers/auth.controller.js';
import {
  validateLogin,
  validateSignUp,
} from '../middlewares/validations/validation.js';

const router = express.Router();

// router.route('/auth').get((req, res) => res.send('LOGIN PAGE'));
router.route('/auth/login').post(validateLogin, authLogin);
router.route('/auth/logout').delete(authLogout);
router.route('/auth/signup').post(validateSignUp, authSignup);
export default router;
