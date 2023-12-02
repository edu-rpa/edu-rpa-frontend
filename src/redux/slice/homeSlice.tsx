import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isHiddenSidebar: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initState,
  reducers: {
    toggleSidebar: (state) => {
      state.isHiddenSidebar = !state.isHiddenSidebar;
    },
  },
});

export const { toggleSidebar } = homeSlice.actions;

export default homeSlice;
