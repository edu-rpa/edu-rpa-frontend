export enum VariableType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  File = 'file',
  List = 'list',
  Dictionary = 'dictionary',
  Connection = 'connection',
}

export interface Variable {
  id: string;
  name: string;
  value: any;
  isArgument: boolean;
  type: VariableType;
}

export interface VariableItem {
  processID: string;
  variables: Variable[];
}
