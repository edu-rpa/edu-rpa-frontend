import { Activity } from './activity';
import { Variable } from './variable';

export interface ProcessList {
  processID: string;
  xml: string;
  processName: string;
  activities: Activity[];
  variables: Variable[];
}
