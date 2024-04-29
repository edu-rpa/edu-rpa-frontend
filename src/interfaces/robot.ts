export interface Robot {
  userId: number;
  processId: string;
  processVersion: number;
  name: string;
  createdAt: Date;
  triggerType: TriggerType;
  robotKey: string;
  [key: string]: any;
}

export interface Schedule {
  CreationDate: Date;
  StartDate?: Date;
  EndDate?: Date;
  LastModificationDate: Date;
  Name: string;
  ScheduleExpression: string;
  ScheduleExpressionTimezone: string;
  Target: {
    Input: string;
  };
  State: EventState;
}

export enum TriggerType {
  SCHEDULE = 'schedule',
  MANUAL = 'manual',
  EVENT_GMAIL = 'event-gmail',
  EVENT_DRIVE = 'event-drive',
  EVENT_FORMS = 'event-forms',
}

export enum EventState {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}
