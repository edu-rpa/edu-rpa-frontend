import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isSaved: true,
};

const bpmnSlice = createSlice({
  name: 'home',
  initialState: initState,
  reducers: {
    isSavedChange: (state, action) => {
      state.isSaved = action.payload;
    },
  },
});

export const { isSavedChange } = bpmnSlice.actions;

export default bpmnSlice;
