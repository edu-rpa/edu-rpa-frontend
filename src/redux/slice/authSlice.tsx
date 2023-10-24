import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    updateInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeInfo: (state) => {
      return initialState;
    },
  },
});

export const { updateInfo, removeInfo } = authSlice.actions;

export default authSlice;
