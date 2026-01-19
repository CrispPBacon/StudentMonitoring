/* <--- LOGIN THE USER TO THEIR ACCOUNT ---> */
export async function login(username, password) {
  return (username, password);
}

/* <--- CREATE AN FOR USER ---> 
  NOTE: Create a user account for dashboard access.
*/

export async function signup(email, username, password) {
  return (email, username, password);
}

/* <--- CHECKS IF USER IS LOGGED IN ---> */
export async function getUserSession(session) {
  if (!session || !session.user_id) return null;

  const user_data = await User.findById(session.user_id)
    .select('-password -createdAt -updatedAt -__v')
    .lean();

  if (!user_data) return null;
  return user_data;
}
