import { BPMNState, UpdateBPMNActionPayload } from '@/types/activity';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BPMNState = {
  processId: '',
  activities: [],
};

const bpmnSlice = createSlice({
  name: 'bpmn',
  initialState: initialState,
  reducers: {
    updateBPMN: (state, action: PayloadAction<UpdateBPMNActionPayload>) => {
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
