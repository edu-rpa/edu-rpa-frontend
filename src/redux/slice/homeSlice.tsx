import { createSlice } from '@reduxjs/toolkit';

const initState = {
  isLogin: false,
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
      state.isLogin = true;
    },
    setLogout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { toggleSidebar, setLogin, setLogout } = homeSlice.actions;

export default homeSlice;
