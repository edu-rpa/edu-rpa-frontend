import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import homeSlice from './slice/homeSlice';
import bpmnSlice from './slice/bpmnSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    home: homeSlice.reducer,
    bpmn: bpmnSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
