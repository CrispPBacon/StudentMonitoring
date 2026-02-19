import {
  createSlice,
  // type PayloadAction
} from '@reduxjs/toolkit';
import { fetchCurrentUser, loginUser, logoutUserThunk } from './userThunks';
import type { ErrorProps, User } from '@/lib/types';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: ErrorProps | null;
}

const initialState: UserState = {
  user: null,
  isLoading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.error = action.payload as ErrorProps;
      })

      // LOGOUT
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
      })

      // FETCH SESSION
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

// export const { setUser, logoutUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
