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

// NOTE: EMAIL Default

process.env.EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
process.env.EMAIL_PORT = process.env.EMAIL_PORT || 587;
process.env.EMAIL_USER = process.env.EMAIL_USER || '';
process.env.EMAIL_PASS = process.env.EMAIL_PASS || '';

// NOTE: SMS Default
process.env.SMS_API_TOKEN = process.env.SMS_API_TOKEN || '';
