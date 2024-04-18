export interface PropertiesProps {
  currentStep: number;
  packageName: string;
  serviceName: string;
  activityName: string;
}
export interface ArgumentProps {
  type: string;
  description: string;
  keywordArg?: string | null;
  value?: any;
  hidden?: boolean,
}
