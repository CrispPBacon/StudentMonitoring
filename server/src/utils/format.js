import mongoose from 'mongoose';

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
}

export function isValidMongoId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  return true;
}
