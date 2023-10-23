import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
};

const emailSlice = createSlice({
  name: 'email',
  initialState: initialState,
  reducers: {
    updateEmail: (state, actions) => {
      state.email = actions.payload.status;
    },
    removeEmail: (state) => {
      state.email = '';
    },
  },
});

export const { updateEmail, removeEmail } = emailSlice.actions;

export default emailSlice;
