import { EventState, TriggerType } from "@/interfaces/robot";

export interface CreateRobotDto {
  name: string;
  processId: string;
  code: string;
  triggerType: TriggerType;
}

export interface CreateScheduleDto {
  schedule_expression: string;
  schedule_expression_timezone: string;
  start_date?: string;
  end_date?: string;
}

export interface EventSchedule {
  type: TriggerType;
  connection_name: string;
  filter: any;
  state: EventState;
}

export type UpdateScheduleDto = CreateScheduleDto;
