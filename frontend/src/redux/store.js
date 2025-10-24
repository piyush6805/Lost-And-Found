import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemReducer from './itemSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
  },
});