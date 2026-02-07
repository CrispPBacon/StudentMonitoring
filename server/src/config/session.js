import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

const MongoDBStoreSession = MongoDBStore(session);
const isProduction = process.env.NODE_ENV === 'production';

const store = new MongoDBStoreSession({
  uri: process.env.DATABASE_URL,
  collection: 'sessions',
  databaseName: process.env.DATABASE_NAME,
});

store.on('error', (error) => {
  console.error('Session store error:', error);
});

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store,
};

const sessionLog = (_req, _, next) => {
  if (isProduction) console.log(_req.session);
  next();
};

export { sessionLog, sessionConfig };
