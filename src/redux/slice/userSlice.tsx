import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  avatarUrl: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
    },

    removeUser: (state) => {
      state = initialState;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice;
