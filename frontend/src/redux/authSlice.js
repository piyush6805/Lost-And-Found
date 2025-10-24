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
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    getProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null;
      localStorage.removeItem('token');
    },

    // --- ADDED THIS NEW REDUCER ---
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      // The backend sends back the user and a *new* token
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFail,
  logout,
  getProfileStart,
  getProfileSuccess,
  getProfileFail,
  updateProfileSuccess, // <-- Add this
} = authSlice.actions;

export default authSlice.reducer;