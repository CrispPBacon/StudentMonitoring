import { getUserSession } from '../services/auth.service.js';
import { UnauthorizedError } from '../utils/errors.js';

export async function validateUserSession(req, res, next) {
  try {
    const user = await getUserSession(req.session);
    if (!user) {
      res.clearCookie('connect.sid');
      throw new UnauthorizedError('Session is invalid or expired');
    }
    next();
  } catch (error) {
    next(error);
  }
}
