export class BpmnParseError extends Error {
  constructor(public message: string, public bpmnId: string) {
    super();
  }
}

export enum BpmnParseErrorCode {
  "Missing Property" = "Missing Property",
  "Invalid Struture - Flow Must Follow From End To Start" = "Invalid Struture - Flow Must Follow From End To Start",
  "Both a split node and a join node" = "Both a split node and a join node",
  "Detected Loop in Process - Unsupported" = "Detected Loop in Process - Unsupported",
  "Invalid Workflow - start and end event not connect" = "Invalid Workflow - start and end event not connect",
}