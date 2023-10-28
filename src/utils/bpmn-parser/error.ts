export class BpmnParseError extends Error {
  constructor(public message: string, public bpmnId: string) {
    super();
  }
}
