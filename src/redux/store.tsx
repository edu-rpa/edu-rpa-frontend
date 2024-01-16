import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import homeSlice from './slice/homeSlice';
import bpmnSlice from './slice/bpmnSlice';
import userSlice from './slice/userSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    home: homeSlice.reducer,
    bpmn: bpmnSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
