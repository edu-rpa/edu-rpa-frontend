export interface Activity {
  processId: string;
  activityId: string;
  activityName: string;
  activityType: string;
  incoming: Flow[];
  outgoing: Flow[];
}

export interface Flow {
  flowId: string;
  name?: string;
}
