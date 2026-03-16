import { getUserBySession, login, signup } from '#services/auth.service.js';
import { BadRequestError, UnauthorizedError } from '#utils/errors.js';

export async function authLogin(req, res, next) {
  const { email, password } = req.body || {};
  try {
    // NOTE: Validation of fields and user existence
    if (!email || !password)
      throw new BadRequestError('Invalid username or password');

    const user = await login(email, password);
    req.session.user_id = user._id.toString();
    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
}

export async function authSignup(req, res, next) {
  try {
    const user = req.body;
    const data = await signup(user);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function authLogout(req, res, next) {
  try {
    if (!req.session || !req.session.user_id)
      throw new BadRequestError('You are not logged in!');
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.status(200).json({ data: { msg: 'You have logged out' } });
  } catch (error) {
    next(error);
  }
}

export async function refreshAuth(req, res, next) {
  try {
    const user = await getUserBySession(req.session);
    if (!user) {
      req.session.destroy();
      res.clearCookie('connect.sid');
      throw new UnauthorizedError('Session invalid or does not exist');
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
}
