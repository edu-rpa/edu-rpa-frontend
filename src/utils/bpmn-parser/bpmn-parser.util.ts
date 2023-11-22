import { Bpmn, Convert } from '.';
import { BpmnElement } from './model/bpmn.dto';
import {
  BpmnEndEvent,
  BpmnExclusiveGateway,
  BpmnFlow,
  BpmnStartEvent,
  BpmnTask,
  BpmnProcess,
  BpmnSubProcess
} from "./model/bpmn";

import { ConcreteGraphVisitor, ConcreteSequenceVisitor } from "./visitor";
import { Properties } from './model/properties.model';

var convert = require('xml-js');
var options = { ignoreComment: true, alwaysChildren: true };
if (typeof window === 'undefined') {
  var fs = require('fs'); // Comment When run
}
// }else {
//   var fs = require('fs'); // Comment When run
// }
export class BpmnParser {
  constructor() {}

  public parse(fileName: string, properties: Properties[]) {
    // Convert XML to JSON Format
    let xml = fs.readFileSync(fileName, 'utf8');
    let result = convert.xml2js(xml, options);
    let bpmn: Bpmn = Convert.toBpmn(JSON.stringify(result));

    // Conver JSON To BpmnObject
    let process = bpmn.elements[0].elements.filter((e) =>
      e.name.includes('process')
    )[0];
    const process_name = process.name;
    const process_attributes = process.attributes;
    let bpmnProcess = new BpmnProcess(process_name, process_attributes.id);
    this.parseElement(process.elements as BpmnElement[], bpmnProcess);
    bpmnProcess.check();

    // Component Analyze: Detect control sequence If Branch
    let g = new ConcreteGraphVisitor(bpmnProcess);
    let sequence = g.buildGraph().buildBasicBlock();

    let robot = new ConcreteSequenceVisitor(sequence, properties).parse();
    return robot.toJSON();
  }

  public parseXML(xml: string) {
    let result = convert.xml2js(xml, options);
    let bpmn: Bpmn = Convert.toBpmn(JSON.stringify(result));

    // Conver JSON To BpmnObject
    let process = bpmn.elements[0].elements.filter((e) =>
      e.name.includes('process')
    )[0];
    const process_name = process.name;
    const process_attributes = process.attributes;
    let bpmnProcess = new BpmnProcess(process_name, process_attributes.id);
    this.parseElement(process.elements as BpmnElement[], bpmnProcess);
    bpmnProcess.check();

    // Component Analyze: Detect control sequence If Branch
    let g = new ConcreteGraphVisitor(bpmnProcess);
    let sequence = g.buildGraph().buildBasicBlock();
    return sequence;
  }

  private parseElement(elements: BpmnElement[], process: BpmnProcess) {
    elements.forEach((element) => {
      switch (true) {
        case element.name.includes('startEvent'):
          let startEvent = new BpmnStartEvent(element);
          process.elements[startEvent.id] = startEvent;
          break;
        case element.name.includes('endEvent'):
          let endEvent = new BpmnEndEvent(element);
          process.elements[endEvent.id] = endEvent;
          break;
        case element.name.includes('task'):
          let bpmnTask: BpmnTask = new BpmnTask(element);
          process.elements[bpmnTask.id] = bpmnTask;
          break;
        case element.name.includes('exclusiveGateway'):
          let bpmnExclusiveGateway: BpmnExclusiveGateway =
            new BpmnExclusiveGateway(element);
          process.elements[bpmnExclusiveGateway.id] = bpmnExclusiveGateway;
          break;
        case element.name.includes('sequenceFlow'):
          let bpmnFlow: BpmnFlow = new BpmnFlow(element);
          process.flows[bpmnFlow.id] = bpmnFlow;
          break;
        case element.name.includes('subProcess'):
          let bpmnSubprocess: BpmnSubProcess = new BpmnSubProcess(element);
          process.elements[bpmnSubprocess.id] = bpmnSubprocess;
          this.parseElement(element.elements, bpmnSubprocess);
          bpmnSubprocess.check();
          break;
        default:
      }
    });
  }

  parse2Sequence(fileName: string) {
    // Convert XML to JSON Format
    let xml = fs.readFileSync(fileName, 'utf8');
    let result = convert.xml2js(xml, options);
    let bpmn: Bpmn = Convert.toBpmn(JSON.stringify(result));

    // Conver JSON To BpmnObject
    let process = bpmn.elements[0].elements.filter((e) =>
      e.name.includes('process')
    )[0];
    const process_name = process.name;
    const process_attributes = process.attributes;
    let bpmnProcess = new BpmnProcess(process_name, process_attributes.id);
    this.parseElement(process.elements as BpmnElement[], bpmnProcess);
    bpmnProcess.check();

    // Component Analyze: Detect control sequence If Branch
    let g = new ConcreteGraphVisitor(bpmnProcess);
    let sequence = g.buildGraph().buildBasicBlock();
    return sequence;
  }
}