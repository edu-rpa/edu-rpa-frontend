export interface Activity {
  processID: string;
  activityID: string;
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
  processID: string;
  xml: string;
  processName: string | null;
  activities: Activity[];
}

export interface UpdateBPMNActionPayload {
  processID: string;
  xml: string;
  processName: string | null;
  activities: Activity[];
}
