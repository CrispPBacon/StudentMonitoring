import mongoose from 'mongoose';
import User from '../models/user.model.js';
import { NotFoundError, UnauthorizedError } from '../utils/errors.js';

/* <--- LOGIN USER ---> 
    NOTE: LOGIN THE USER TO THEIR ACCOUNT
*/
export async function login(username, password) {
  if (!username) throw NotFoundError('Please enter your username');
  if (!password) throw NotFoundError('Please enter your password');

  const user_data = await getUser(username);

  if (!user_data) throw NotFoundError('User not found');
  if (user_data.password !== password)
    throw new UnauthorizedError('Incorrect Password');

  delete user_data.password;
  return user_data;
}

/* <--- CREATE USER ---> 
    NOTE: Create a user account.
*/
export async function addUser(user) {
  const { username, first_name, last_name, email, password } = user;
  const user_data = new User({
    first_name,
    last_name,
    username,
    email,
    password,
  });

  await user_data.save();
  const user_data_object = user_data.toObject();
  delete user_data_object.password;
  return user_data_object;
}

export async function updateUser(user_id) {
  return user_id;
}

/* <--- GET USER INFORMATION ---> 
    NOTE: Fetch User Information From the Database.
*/
export async function getUser(identifier) {
  const query = mongoose.Types.ObjectId.isValid(identifier)
    ? { _id: identifier }
    : { username: identifier };

  const user_data = await User.findOne(query)
    .select('-createdAt -updatedAt -__v')
    .lean();

  return user_data || null;
}

/* <--- CHECK LOGIN ---> 
    NOTE: Checks if session exist and valid, then return user data.
*/
export async function getUserBySession(session) {
  if (!session || !session.user_id) return null;
  const user_data = getUser(session.user_id);
  delete user_data.password;
  return user_data;
}
