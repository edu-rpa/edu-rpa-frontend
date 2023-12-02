import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isLoggedIn: false,
  isHiddenSidebar: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState: initState,
  reducers: {
    toggleSidebar: (state) => {
      state.isHiddenSidebar = !state.isHiddenSidebar;
    },
    setLogin: (state) => {
      state.isLoggedIn = true;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { toggleSidebar, setLogin, setLogout } = homeSlice.actions;

export default homeSlice;
