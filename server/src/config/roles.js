// rbac/roles.js
module.exports = {
  admin: ['read:posts', 'create:posts', 'delete:posts', 'manage:users'],
  editor: ['read:posts', 'create:posts'],
  user: ['read:posts'],
};
