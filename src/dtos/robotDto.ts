export interface CreateRobotDto {
  name: string;
  processId: string;
  code: string;
}

export interface CreateScheduleDto {
  schedule_expression: string;
  schedule_expression_timezone: string;
  start_date?: string;
  end_date?: string;
}
