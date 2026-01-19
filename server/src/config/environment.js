import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;
process.env.HOST = process.env.HOST || 'localhost';
process.env.SESSION_SECRET = process.env.SESSION_SECRET || 'mern';
