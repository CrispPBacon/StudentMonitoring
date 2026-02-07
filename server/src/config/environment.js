import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;
process.env.HOST = process.env.HOST || 'localhost';
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'mern';

// NOTE: Database
process.env.DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/';
process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'student-clock-in';
