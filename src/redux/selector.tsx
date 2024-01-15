import { RootState } from './store';

export const authSelector = (state: RootState) => state.auth;
export const homeSelector = (state: RootState) => state.home;
export const bpmnSelector = (state: RootState) => state.bpmn;
export const userSelector = (state: RootState) => state.user;
