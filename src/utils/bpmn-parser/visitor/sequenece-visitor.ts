import { BpmnParseError, BpmnParseErrorCode } from "../error";
import { BpmnNode, BpmnTask } from "../model/bpmn";
import { Arguments, Properties } from "../model/properties.model";
import { Branch, Sequence } from "./BasicBlock";
import { Argument, BodyItem, Keyword, Resource, Robot, Test } from "./robot";

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

  visit(node: Sequence, param: any) {
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
    let resource = new Resource([], []);
    let robot = new Robot(name, test, resource);
    return robot.toJSON();
  }
  visit(node: Sequence, param: any) {
    if (!node) return { sequence: param, joinNodeId: null };
    return node.accept(this, param);
  }

  visitBpmnTask(node: BpmnTask, params: any[]) {
    let activityID = node.id;
    let property = this.properties.get(activityID);
    if (!property)
      throw new BpmnParseError(
        BpmnParseErrorCode["Missing Property"],
        activityID
      );
    let args = property.properties.arguments;
    let keywordArg = [];
    if (args) {
      keywordArg = Object.keys(args).map(
        (k) => new Argument(k, (args as Arguments)[k])
      );
    }
    return new Keyword(args.activityName, keywordArg)
  }
  visitSequence(node: Sequence, params: any[]) {}
  visitBranch(node: Branch, params: any[]) {}
}
