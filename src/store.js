import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    filters: jobReducer,
  },
});

