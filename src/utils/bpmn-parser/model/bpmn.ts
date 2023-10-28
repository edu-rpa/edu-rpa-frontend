import { BpmnParseError } from "../error";
import { BpmnElement } from "./bpmn.dto";

export class BpmnNode {
    id: string = ""
}

export class BpmnStartEvent extends BpmnNode{
    outgoing: string[] = []
    public constructor(element:BpmnElement) {
        super();
        this.id = element.attributes.id;
        this.outgoing = element.elements.filter(e => e.name === "bpmn:outgoing").map((e) => e.elements[0].text || "")
    }
}

export class BpmnEndEvent extends BpmnNode{
    id: string = ""
    incomming: string[] = []
    public constructor(element:BpmnElement) {
        super();
        this.id = element.attributes.id;
        this.incomming = element.elements.filter(e => e.name === "bpmn:incoming").map((e) => e.elements[0].text || "")
    }
}

export class BpmnTask extends BpmnNode{
    id: string = ""
    name: string = ""
    incomming: string[] = []
    outgoing: string[] = []
    public constructor(element: BpmnElement) {
        super();
        this.id = element.attributes.id
        this.name = element.attributes.name || ""
        this.incomming = element.elements.filter(e => e.name === "bpmn:incoming").map((e) => e.elements[0].text || "")
        this.outgoing = element.elements.filter(e => e.name === "bpmn:outgoing").map((e) => e.elements[0].text || "")
    }
}

export class BpmnExclusiveGateway extends BpmnNode{
    id: string = ""
    name: string = ""
    incomming: string[] = []
    outgoing: string[] = []
    public constructor(element: BpmnElement) {
        super();
        this.id = element.attributes.id
        this.name = element.attributes.name || ""
        this.incomming = element.elements.filter(e => e.name === "bpmn:incoming").map((e) => e.elements[0].text || "")
        this.outgoing = element.elements.filter(e => e.name === "bpmn:outgoing").map((e) => e.elements[0].text || "")
    }
}

export class BpmnProcess {
    elements: {[key: string]: BpmnNode} = {};
    flows: {[key: string]: BpmnFlow} = {};
    body : BpmnNode[] = []
    constructor(
        public name: string,
        public id : string,
    ) {}
    public check() {
        let startEventId = Object.keys(this.elements).find(key => this.elements[key] instanceof BpmnStartEvent);
        if(!startEventId)
            throw new BpmnParseError("Not Found Start Event", this.id)

        let endEventId = Object.keys(this.elements).find(key => this.elements[key] instanceof BpmnEndEvent);
        if(!endEventId)
            throw new BpmnParseError("Not Found Start Event", this.id)
    }
}

export class BpmnSubprocess extends BpmnProcess{
    incomming: string[] = []
    outgoing: string[] = []
    body : BpmnNode[] = []
    public constructor(element: BpmnElement) {
        super(element.attributes.name || "",element.attributes.id);
        this.incomming = element.elements.filter(e => e.name === "bpmn:incoming").map((e) => e.elements[0].text || "")
        this.outgoing = element.elements.filter(e => e.name === "bpmn:outgoing").map((e) => e.elements[0].text || "")
    }
}

export class BpmnFlow {
    id: string = "";
    source:string = "";
    target: string = "";
    name: string = ""

    public constructor(element: BpmnElement) {
        this.id = element.attributes.id
        this.name = element.attributes.name || ""
        this.source = element.attributes.sourceRef || ""
        this.target = element.attributes.targetRef || ""
    }
}

