export interface CreateProcessDto {
  id: string;
  name: string;
  description: string;
  xml: string;
}

export interface UpdateProcessDto {
  name: string;
  description: string;
}

export interface SaveProcessDto {
  xml: string;
  variables: Record<string, any>;
  activities: any[];
}
