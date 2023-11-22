import { BpmnParseError, BpmnParseErrorCode } from "../error";
import { BpmnNode, BpmnTask } from "../model/bpmn";
import { Arguments, Properties } from "../model/properties.model";
import { Branch, Sequence, SequenceItem } from "./BasicBlock";
import {
  Argument,
  BodyItem,
  Keyword,
  Lib,
  Resource,
  Robot,
  Test,
  Variable,
} from "./robot";

export class SequenceVisitor {
  properties: Map<string, Properties>;
  imports: Set<string>;

  constructor(public sequence: Sequence, properties: Properties[]) {
    this.properties = properties.reduce((map, obj) => {
      map.set(obj.activityID, obj);
      return map;
    }, new Map<string, Properties>());
    this.imports = new Set<string>();
  }

  visit(node: SequenceItem, param: any) {
    if (!node) return { sequence: param, joinNodeId: null };
    return node.accept(this, param);
  }

  visitBpmnTask(node: BpmnTask, params: any) {}
  visitSequence(node: Sequence, params: any) {}
  visitBranch(node: Branch, params: any) {}
}

export class ConcreteSequenceVisitor extends SequenceVisitor {
  parse() {
    let name = "";
    let body: BodyItem[] = this.visit(this.sequence, []);
    let test = new Test("Main", body);
    let resource = new Resource(
      Array.from(this.imports).map((i) => new Lib(i)),
      []
    );
    let robot = new Robot(name, test, resource);
    return robot;
  }

  visitBpmnTask(node: BpmnTask, params: any[]) {
    let activityID = node.id;
    let property = this.properties.get(activityID)?.properties;
    if (!property)
      throw new BpmnParseError(
        BpmnParseErrorCode["Missing Property"],
        activityID
      );
    const args = property.arguments;
    const assigns = property.assigns;
    const Lib = property.library;
    let keywordAssigns = [] as Variable[];
    let keywordArg = [] as Argument[];
    if(!property.activityName) {
      throw new BpmnParseError("Activity name must be specified", node.id)
    }
    if (args) {
      keywordArg = Object.keys(args).map(
        (k) => new Argument(k, (args as Arguments)[k])
      );
    }
    if (assigns) {
      keywordAssigns = Object.keys(assigns).map((k) => new Variable(k));
    }
    if (Lib) {
      this.imports.add(Lib);
    }
    return new Keyword(property.activityName, keywordArg, keywordAssigns);
  }

  visitSequence(node: Sequence, params: any[]) {
    let body = [] as BodyItem[];
    for(let item of node.block) {
      body = body.concat(this.visit(item, params));
    }
    return body
  }

  visitBranch(node: Branch, params: any[]) {}
}
