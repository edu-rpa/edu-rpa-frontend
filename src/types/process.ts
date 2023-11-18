import { Activity } from './activity';

export interface Process {
  processID: string;
  xml: string;
  processName: string | null;
  activities: Activity[];
}
