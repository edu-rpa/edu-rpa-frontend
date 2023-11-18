import { VariableType } from './variable';

export interface Activity {
  processID?: string;
  activityID: string;
  activityName?: string;
  activityType: string;
  incoming?: Flow[];
  outgoing?: Flow[];
  properties: Property[];
}

export interface Property {
  [key: string]: VariableType;
}

export interface Flow {
  flowId: string;
  name?: string;
}
