import { RootState } from './store';

export const authSelector = (state: RootState) => state.auth;
export const bpmnSelector = (state: RootState) => state.bpmn;
