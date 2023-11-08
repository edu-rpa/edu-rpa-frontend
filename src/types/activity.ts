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

export interface BPMNState {
  processId: string;
  activities: Activity[];
}

export interface UpdateBPMNActionPayload {
  processId: string;
  activities: Activity[];
}
