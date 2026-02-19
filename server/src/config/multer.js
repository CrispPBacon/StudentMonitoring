import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ROOT_DIR } from '../utils/directory.js';
import { BadRequestError } from '../utils/errors.js';
// import { getStudent } from '../services/student.service.js';
// import { BadRequestError } from '../utils/errors.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destination = path.join(ROOT_DIR, 'students_display_photo');
    // ? Ensure the directory exists, create it if it doesn't
    fs.promises
      .mkdir(destination, { recursive: true })
      .then(() => cb(null, destination))
      .catch((err) => cb(err));
  },

  filename: async (req, file, cb) => {
    const filename = await getFileName();
    cb(null, filename);
  },
});

async function getFileName() {
  // const { fieldname } = file;
  // const ext = path.extname(file.originalname);
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  // let filename;
  // if (fieldname == 'display_photo') filename = 'display_photo' + ext;
  // else filename = uniqueSuffix + '.webp';
  const filename = uniqueSuffix + '.webp';
  return filename;
}

async function FileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError('Only .jpeg, .jpg, .png, .webp files are allowed!'),
      false
    );
  }
}

// ? Set a maximum file size of 32MB //
const fileMaxSize = 32 * 1024 * 1024;

const upload = multer({
  storage: storage,
  limits: { fileSize: fileMaxSize },
  fileFilter: FileFilter,
});

export default upload;
