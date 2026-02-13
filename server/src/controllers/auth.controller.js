import { addUser, login } from '../services/auth.service.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';

export async function AuthLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new NotFoundError('Please enter your username and password!');
    const user_data = await login(username, password);
    req.session.user_id = user_data._id.toString();
    return res.status(200).json(user_data);
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
    return res.status(200).json({ msg: 'You have logged out' });
  } catch (e) {
    next(e);
  }
}
