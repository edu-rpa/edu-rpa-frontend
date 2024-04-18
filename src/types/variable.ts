export enum VariableType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  File = 'file',
  List = 'list',
  Dictionary = 'dictionary',
  Connection = 'connection',
  DocumentTemplate = 'template',
}

export interface Variable {
  id: number;
  name: string;
  value: any;
  isArgument: boolean;
  type: VariableType;
  label?: string;
}

export interface VariableItem {
  processID: string;
  variables: Variable[];
}
