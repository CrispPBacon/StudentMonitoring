import {
  createFieldValidator,
  handleValidationErrors,
} from './validation-rules.js';
import {
  assertUserExists,
  assertUsernameAvailable,
  assertNoActiveSession,
} from './auth/user.validation.js';

export const validateLogin = [
  assertNoActiveSession,
  createFieldValidator(['username'], 4, [assertUserExists]),
  createFieldValidator(['password'], 1),
  handleValidationErrors,
];
export const validateSignUp = [
  assertNoActiveSession,
  createFieldValidator(['first_name', 'last_name'], 2),
  createFieldValidator(['email'])
    .pop()
    .isEmail()
    .withMessage('Invalid email address'),

  createFieldValidator(['username'], 4, [assertUsernameAvailable]),
  createFieldValidator(['password'], 5),
  handleValidationErrors,
];
