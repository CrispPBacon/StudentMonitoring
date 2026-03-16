import mongoose from 'mongoose';
import User from '#models/user.model.js';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '#utils/errors.js';
import { toTitleCase } from '#utils/format.js';

/* -<--- USER SERVICES FUNCTIONS --->- */
// NOTE: LOGIN THE USER TO THEIR ACCOUNT
export async function login(email, password) {
  if (!email) throw NotFoundError('Please enter your username');
  if (!password) throw NotFoundError('Please enter your password');
  await assertUser({ email });
  const user = await getUser({ email });
  if (!user) throw NotFoundError('User not found');
  if (user.password !== password)
    throw new UnauthorizedError('Incorrect Password');

  delete user.password;
  return user;
}

export async function signup(user) {
  const { first_name, last_name, username, email, password } = user || {};
  await assertFieldAvailable({ username });
  await assertFieldAvailable({ email });

  console.log('HERE', Object.keys(user));
  for (const key of Object.keys(user)) {
    const value = user[key];
    if (!value) {
      const field_name = toTitleCase(key.replaceAll('_', ' '));
      throw new NotFoundError(`${toTitleCase(field_name)} is required!`);
    }
  }

  const newUser = await addUser({
    first_name,
    last_name,
    username,
    email,
    password,
  });
  return newUser;
}

/* -<--- END SERVICES --->- */

/* -<--- SERVICE VALIDATION --->- */
// NOTE: Ascertain if user exists.
export async function assertUser(query) {
  if (typeof query !== 'object')
    throw new TypeError('Query must be a non-null object');
  const user = await getUser(query);
  if (!user) throw new NotFoundError('User does not exist');
  return true;
}

// NOTE: Ascertain field is available and no user uses it.
export async function assertFieldAvailable(query) {
  if (typeof query !== 'object')
    throw new TypeError('Query must be a non-null object');

  const user = await getUser(query);
  const field = Object.keys(query)[0];
  if (user) throw new ConflictError(`${toTitleCase(field)} is not available`);
  return true;
}

/* -<--- END OF SERVICE VALIDATION --->- */

/* -<--- USER RESPOSITORY FUNCTIONS --->- */
// NOTE: Create a user account.
export async function addUser(userData) {
  const { username, first_name, last_name, email, password } = userData;
  const user = new User({
    first_name,
    last_name,
    username,
    email,
    password,
  });

  await user.save();
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

export async function updateUser(user_id) {
  return user_id;
}

// NOTE: Fetch User Information From the Database.
export async function getUser(identifier) {
  const query = mongoose.Types.ObjectId.isValid(identifier)
    ? { _id: identifier }
    : identifier;

  const user = await User.findOne(query)
    .select('-createdAt -updatedAt -__v')
    .lean();

  return user || null;
}

// NOTE: Checks if session exist and valid, then return user data.
export async function getUserBySession(session) {
  if (!session || !session.user_id) return null;
  const user = getUser(session.user_id);
  delete user?.password;
  return user || null;
}

/* -<--- END RESPOSITORY --->- */
