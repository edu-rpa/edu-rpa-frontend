export class BpmnParseError extends Error {
  constructor(public message: string, public bpmnId: string) {
    super();
  }
}

export class VariableError extends Error {
  constructor(public message: string, public variableName: any) {
    super();
  }
}

export enum BpmnParseErrorCode {
  "Variable Not Exist" = "Variable Not Exist",
  "Invalid Property" = "Invalid Property",
  "Have 2 else branch - missing condition" = "Have 2 else branch - missing condition",
  "Activity name must be specified" = "Activity name must be specified",
  "Missing Property" = "Missing Property",
  "Invalid Struture - Flow Must Follow From End To Start" = "Invalid Struture - Flow Must Follow From End To Start",
  "Both a split node and a join node" = "Both a split node and a join node",
  "Detected Loop in Process - Unsupported" = "Detected Loop in Process - Unsupported",
  "Invalid Workflow - start and end event not connect" = "Invalid Workflow - start and end event not connect",
  "Unknown" = "Unknown"
}

export enum VariableErrorCode {
  "Invalid Variable Name - Variable Contain Special Character" = "Invalid Variable Name - Variable Contain Special Character",
  "Incompatible Type" = "Incompatible Type",
  "Value Invalid" = "Value Invalid",
}

export enum CredentialProviderCode {
  "Not found provider" = "Not found provider"   
}