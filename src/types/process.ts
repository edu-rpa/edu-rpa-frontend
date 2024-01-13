import { Activity } from './activity';
import { Variable } from './variable';

export interface Process {
  processID: string;
  xml: string;
  processName: string;
  processType?: string;
  processDesc?: string;
  activities: Activity[];
  variables: Variable[];
}
