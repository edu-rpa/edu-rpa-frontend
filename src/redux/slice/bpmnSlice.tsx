import { BPMNState } from '@/types/activity';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BPMNState = {
  processID: '',
  xml: '',
  processName: '',
  activities: [],
};

const bpmnSlice = createSlice({
  name: 'bpmn',
  initialState: initialState,
  reducers: {
    updateBPMN: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    removeBPMN: (state) => {
      return initialState;
    },
  },
});

export const { updateBPMN, removeBPMN } = bpmnSlice.actions;

export default bpmnSlice;
