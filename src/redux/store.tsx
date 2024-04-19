import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import homeSlice from './slice/homeSlice';
import bpmnSlice from './slice/bpmnSlice';
import userSlice from './slice/userSlice';
import scheduleSlice from './slice/scheduleSlice';
import notificationSlice from './slice/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    home: homeSlice.reducer,
    bpmn: bpmnSlice.reducer,
    user: userSlice.reducer,
    schedule: scheduleSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
