import { configureStore } from '@reduxjs/toolkit';
import emailSlice from './slice/emailSlice';

const store = configureStore({
  reducer: {
    email: emailSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
