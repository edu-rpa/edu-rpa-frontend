import { BpmnProcess } from './bpmn';

class BpmnComponent {
  id = '';
  name = '';
  incomming: BpmnComponent[] = [];
  outgoing: BpmnComponent[] = [];

  constructor() {}

  addIncommingTask() {}
  removeIncommingTask() {}
  addOutgoingTask() {}
  removeOutgoingTask() {}
  toString() {}
}

class BpmnTask extends BpmnComponent {
  constructor() {
    super();
  }
  toString() {
    console.log(`ID: ${this.id}, Name: ${this.name}`);
  }
}

class BpmnSubProcess extends BpmnComponent {
  constructor(id: string, name: string) {
    super();
  }

  toString() {
    console.log(`ID: ${this.id}, Name: ${this.name}`);
  }
}

class BpmnExclusiveGateWay {
  id: string;
  defaultOption: string;
  constructor(id: string, defaultOption: string) {
    this.id = id;
    this.defaultOption = defaultOption;
  }

  toString() {
    console.log(`ID: ${this.id}`);
  }
}

class BpmnEvent {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  toString() {
    console.log(`ID: ${this.id}, Name: ${this.name}`);
  }
}

class BpmnStartEvent extends BpmnEvent {
  constructor(id: string, name: string) {
    super(id, name);
  }

  // You can add methods and properties specific to BPMN start events here
}

class BpmnStopEvent extends BpmnEvent {
  constructor(id: string, name: string) {
    super(id, name);
  }

  // You can add methods and properties specific to BPMN stop events here
}

export {
  BpmnComponent,
  BpmnProcess,
  BpmnSubProcess,
  BpmnExclusiveGateWay,
  BpmnEvent,
  BpmnStartEvent,
  BpmnStopEvent,
};
