import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import bpmnSlice from './slice/bpmnSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    bpmn: bpmnSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
