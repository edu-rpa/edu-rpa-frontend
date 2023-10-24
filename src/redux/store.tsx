import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
