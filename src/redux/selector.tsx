import { RootState } from './store';

export const authSelector = (state: RootState) => state.auth;
export const homeSelector = (state: RootState) => state.home;
