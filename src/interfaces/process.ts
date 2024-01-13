export interface ProcessResponse {
  id: string;
  xml: string;
  variables: Record<string, any>;
  activities: any[];
}
