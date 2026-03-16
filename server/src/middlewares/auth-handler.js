import { getUser, getUserBySession } from '../services/auth.service.js';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/errors.js';

export async function requireUserSession(req, res, next) {
  try {
    const user = await getUserBySession(req.session);
    if (!user) {
      res.clearCookie('connect.sid');
      throw new UnauthorizedError('Session is invalid or expired');
    }
    next();
  } catch (error) {
    next(error);
  }
}

export async function assertNoActiveSession(req, res, next) {
  const user = await getUserBySession(req.session);
  if (user) return next(new ConflictError('Active session already exists'));

  res.clearCookie('connect.sid');
  return next();
}

export async function assertUser(req, _, next) {
  let query;
  const { username, email } = req.body || {};
  if (!username && !email)
    return next(new NotFoundError('User does not exist'));
  if (username) query = { username };
  if (email) query = { email };
  if (email || username) {
    const user = await getUser(query);
    if (!user) next(new NotFoundError('User does not exist'));
  }
  return next();
}
