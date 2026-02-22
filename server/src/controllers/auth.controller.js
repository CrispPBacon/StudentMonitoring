import { addUser, getUserBySession, login } from '../services/auth.service.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errors.js';

export async function AuthLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new NotFoundError('Please enter your username and password!');
    const user_data = await login(email, password);
    req.session.user_id = user_data._id.toString();
    return res.status(200).json({ data: user_data });
  } catch (error) {
    next(error);
  }
}

export async function AuthSignup(req, res, next) {
  try {
    const user_data = req.body;
    const data = await addUser(user_data);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function AuthLogout(req, res, next) {
  try {
    if (!req.session || !req.session.user_id)
      throw new BadRequestError('You are not logged in!');
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.status(200).json({ data: { msg: 'You have logged out' } });
  } catch (e) {
    next(e);
  }
}

export async function RefreshAuth(req, res, next) {
  try {
    const user = await getUserBySession(req.session);
    if (!user) {
      req.session.destroy();
      res.clearCookie('connect.sid');
      throw new UnauthorizedError('Session invalid or does not exist');
    }
    return res.status(200).json({ data: user });
  } catch (e) {
    next(e);
  }
}
