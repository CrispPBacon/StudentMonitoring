import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/auth/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
