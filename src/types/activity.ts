export interface Activity {
  activityID: string;
  activityName?: string;
  activityType: string;
  properties: object;
}

export interface Flow {
  flowId: string;
  name?: string;
}
