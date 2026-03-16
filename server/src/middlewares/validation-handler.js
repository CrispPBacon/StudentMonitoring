import { BadRequestError, NotFoundError } from '#utils/errors.js';
import { validationResult } from 'express-validator';

export function handleValidationErrors(req, _, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  //   next(new BadRequestError(errors.array()[0].msg));
  const errorMsg = errors.array()[0].msg;
  if (
    errorMsg.includes('is required') ||
    errorMsg.includes('exist') ||
    errorMsg.includes('invalid')
  )
    return next(new NotFoundError(errorMsg));
  return next(new BadRequestError(errorMsg));
}
