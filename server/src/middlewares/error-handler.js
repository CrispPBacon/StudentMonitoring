import { makeError } from '../utils/errors.js';

export async function errorHandlerMiddleware(err, _, res, next) {
  if (!err) return next();
  const { error, statusCode } = makeError(err);
  if (process.env.NODE_ENV !== 'production')
    console.error('[!] Error stack:', err.stack);
  return res.status(statusCode).json({ error });
}
