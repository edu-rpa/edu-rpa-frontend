import { start } from "repl";
import { BpmnParseError } from "../error";
import { genIndent } from "../visitor/BasicBlock";
import { BpmnElement } from "./bpmn.dto";

export abstract  class BpmnNode {
    id: string = ""
    accept(visitor: any,  param: any) { // self: Visitor
        let method_name = `visit${this.constructor.name}`
        return visitor[method_name](this,param) // this is current class
    }
    public abstract toString(indent: number) : string
}

export class BpmnStartEvent extends BpmnNode{
    outgoing: string[] = []
    public constructor(element:BpmnElement) {
        super();
        this.id = element.attributes.id;
        this.outgoing = element.elements.filter(e => e.name === "bpmn:outgoing").map((e) => e.elements[0].text || "")
    }
    public toString (indent: number)  {
        return genIndent(0, "START")
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
    public toString  (indent: number) : string {
        return genIndent(0, "END")
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
    public toString (indent: number) : string {
        return genIndent(indent, `${this.id} - ${this.name}`)
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
    public toString (indent: number) : string {
        return ""
    }
}

export class BpmnProcess extends BpmnNode {
    elements: {[key: string]: BpmnNode} = {};
    flows: {[key: string]: BpmnFlow} = {};
    body : BpmnNode[] = []
    constructor(
        public name: string,
        public id : string,
    ) 
    {
        super()
    }
    public check() {
        let startEventId = Object.keys(this.elements).find(key => this.elements[key] instanceof BpmnStartEvent);
        if(!startEventId)
            throw new BpmnParseError("Not Found Start Event", this.id)

        let endEventId = Object.keys(this.elements).find(key => this.elements[key] instanceof BpmnEndEvent);
        if(!endEventId)
            throw new BpmnParseError("Not Found Start Event", this.id)
    }
    public toString (indent: number) : string {
        return "Process"
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

