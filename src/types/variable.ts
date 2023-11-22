export enum VariableType {
  CONNECTION_DRIVE = 'connection:drive',
  CONNECTION_GMAIL = 'connection:gmail',
  CONNECTION_SHEET = 'connection:sheet',
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  FILE = 'file',
}

export interface Variable {
  type: VariableType;
  isArgument: boolean;
  defaultValue: any;
}
