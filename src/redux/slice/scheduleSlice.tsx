import { Schedule } from '@/interfaces/robot';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ScheduleState {
  name: string;
  type: string;
  timezone: string;
  datetime: string;
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  year: string;
}

const initialState: ScheduleState = {
  name: '',
  type: 'at',
  timezone: 'UTC+00:00',
  datetime: '',
  minute: '*',
  hour: '*',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
  year: '*',
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule: (state, action: PayloadAction<Schedule>) => {
      state.name = action.payload.Name;
      state.type = action.payload.ScheduleExpression.split('(')[0];
      state.timezone = action.payload.ScheduleExpressionTimezone;

      if (state.type === 'at') {
        state.datetime = action.payload.ScheduleExpression.split('(')[1].split(')')[0];
      } else if (state.type === 'cron') {
        const cron = action.payload.ScheduleExpression.split('(')[1].split(')')[0];
        const cronArr = cron.split(' ');
        state.minute = cronArr[0];
        state.hour = cronArr[1];
        state.dayOfMonth = cronArr[2];
        state.month = cronArr[3];
        state.dayOfWeek = cronArr[4];
        state.year = cronArr[5];
      }
    },

    setScheduleName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setScheduleType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },

    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },

    setDatetime: (state, action: PayloadAction<string>) => {
      state.datetime = action.payload;
    },

    setMinute: (state, action: PayloadAction<string>) => {
      state.minute = action.payload;
    },

    setHour: (state, action: PayloadAction<string>) => {
      state.hour = action.payload;
    },

    setDayOfMonth: (state, action: PayloadAction<string>) => {
      state.dayOfMonth = action.payload;
    },

    setMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },

    setDayOfWeek: (state, action: PayloadAction<string>) => {
      state.dayOfWeek = action.payload;
    },

    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },

    resetSchedule: (state) => {
      state.name = '';
      state.type = 'at';
      state.timezone = 'UTC+00:00';
      state.datetime = '';
      state.minute = '*';
      state.hour = '*';
      state.dayOfMonth = '*';
      state.month = '*';
      state.dayOfWeek = '*';
      state.year = '*';
    },
  },
});

export const { 
  setSchedule,
  setScheduleName, 
  setScheduleType, 
  setTimezone, 
  setDatetime, 
  setMinute, 
  setHour, 
  setDayOfMonth, 
  setMonth, 
  setDayOfWeek, 
  setYear,
  resetSchedule,
} = scheduleSlice.actions;

export default scheduleSlice;
