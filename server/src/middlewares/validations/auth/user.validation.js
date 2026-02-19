import { ConflictError, NotFoundError } from '../../../utils/errors.js';
import {
  getUser,
  getUserByEmail,
  getUserBySession,
} from '../../../services/auth.service.js';

/**
 * Checks if a given username is available (not already taken).
 *
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - Resolves to true if the username is available.
 * @throws {ConflictError} - If the username is already taken.
 */
export async function assertUsernameAvailable(username) {
  const usernameTaken = Boolean(await getUser(username));
  if (usernameTaken) throw new ConflictError('Username is already taken');
  return true;
}

/**
 * Verifies whether a user with the given username exists.
 *
 * @param {string} username - The username to check.
 * @returns {Promise<boolean>} - Resolves to true if the user exists.
 * @throws {NotFoundError} - If the user does not exist.
 */
export async function assertUserExists(username) {
  const userExist = Boolean(await getUser(username));
  if (!userExist) throw new NotFoundError('User does not exist');
  return true;
}

export async function assertUserExistsByEmail(email) {
  const emailExist = Boolean(await getUserByEmail(email));
  if (!emailExist) throw new NotFoundError('User does not exist');
  return true;
}

/**
 * Express middleware to check that there is no active session.
 * - If a session is active, a ConflictError is passed to the next middleware.
 * - If no session is active, clears the session cookie and continues.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export async function assertNoActiveSession(req, res, next) {
  const user = await getUserBySession(req.session);
  if (user) return next(new ConflictError('Active session already exists'));

  res.clearCookie('connect.sid');
  return next();
}
