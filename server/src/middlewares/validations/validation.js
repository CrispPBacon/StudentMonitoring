import {
  createFieldValidator,
  handleValidationErrors,
} from './validation-rules.js';
import {
  assertUsernameAvailable,
  assertNoActiveSession,
  assertUserExistsByEmail,
} from './auth/user.validation.js';

export const validateLogin = [
  assertNoActiveSession,
  createFieldValidator(['email'], 4, [assertUserExistsByEmail])
    .pop()
    .isEmail()
    .withMessage('Invalid email address'),

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
