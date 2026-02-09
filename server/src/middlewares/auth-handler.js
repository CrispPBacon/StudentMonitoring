import { getUserBySession } from '../services/auth.service.js';
import { UnauthorizedError } from '../utils/errors.js';

export async function requireUserSession(req, res, next) {
  try {
    const user_data = await getUserBySession(req.session);
    if (!user_data) {
      res.clearCookie('connect.sid');
      throw new UnauthorizedError('Session is invalid or expired');
    }
    next();
  } catch (error) {
    next(error);
  }
}
