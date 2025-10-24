import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer for when an auth action starts
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for successful auth (login/register)
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Save token
    },
    // Reducer for failed auth
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducer for logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); 
    },

    // Reducers for getting profile
    getProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload; // Payload is just the user object
    },
    getProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null; // Token is invalid or expired, so log them out
      localStorage.removeItem('token');
    },
  },
});

// Export the actions
export const {
  authStart,
  authSuccess,
  authFail,
  logout,
  getProfileStart,
  getProfileSuccess,
  getProfileFail,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;