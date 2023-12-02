import { createSlice } from '@reduxjs/toolkit';

const initState = {
  name: '',
  email: '',
  password: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    updateInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeInfo: (state) => {
      return initState;
    },
  },
});

export const { updateInfo, removeInfo } = authSlice.actions;

export default authSlice;
