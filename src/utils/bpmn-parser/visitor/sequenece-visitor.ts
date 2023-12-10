import { Variable } from "@/types/variable";
import { BpmnParseError, BpmnParseErrorCode, VariableError, VariableErrorCode } from "../error";
import { BpmnNode, BpmnTask } from "../model/bpmn";
import { Arguments, ProcessVariables, Properties } from "../model/properties.model";
import { BlankBlock, Branch, IfBranchBlock, Sequence, SequenceItem } from "./BasicBlock";
import {
  Argument,
  BodyItem,
  For,
  If,
  IfBranch,
  Keyword,
  Lib,
  ProcessVariable,
  Resource,
  Robot,
  Test,
} from "./robot";

export class SequenceVisitor {
  properties: Map<string, Properties>;
  imports: Set<string>;
  variables: Variable[];

  constructor(public sequence: Sequence, properties: Properties[], variables: Variable[]) {
    console.log(properties)
    this.properties = properties.reduce((map, obj) => {
      map.set(obj.activityID, obj);
      return map;
    }, new Map<string, Properties>());
    this.imports = new Set<string>();
    this.variables = variables
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
    let variables: ProcessVariable[] = this.parseVariables()
    let resource = new Resource(
      Array.from(this.imports).map((i) => new Lib(i)),
      variables
    );
    let robot = new Robot(name, test, resource);
    return robot;
  }

  parseVariables() {
    return this.variables.map((v) => {
      let value;
      try {
        value = JSON.parse(v.value);
      } catch (error) {
        throw new VariableError(VariableErrorCode["Value Invalid"], v)
      }
      
      return new ProcessVariable(v.name, value, v.type)
    })
  }

  visitBpmnTask(node: BpmnTask, params: any[]) {
    let activityID = node.id;
    let property = this.properties.get(activityID)?.properties;
    if (!property)
      throw new BpmnParseError(
        BpmnParseErrorCode["Missing Property"],
        activityID
      );
    if(property.activityPackage === "Control") {
      throw new BpmnParseError(BpmnParseErrorCode["Invalid Property"], activityID)
    }
    const args = property.arguments;
    const assigns = property.assigns;
    const Lib = property.library;
    let keywordAssigns = [] as ProcessVariable[];
    let keywordArg = [] as Argument[];
    if (!property.activityName) {
      throw new BpmnParseError("Activity name must be specified", node.id);
    }
    if (args) {
      keywordArg = Object.keys(args).map(
        (k) => new Argument(k, (args as Arguments)[k])
      );
    }
    if (assigns) {
      keywordAssigns = Object.keys(assigns).map((k) => new ProcessVariable(k));
    }
    if (Lib) {
      this.imports.add(Lib);
    }
    return [new Keyword(property.activityName, keywordArg, keywordAssigns)];
  }

  visitSequence(node: Sequence, params: any[]) {
    let body = [] as BodyItem[];
    for (let item of node.block) {
      body = body.concat(this.visit(item, params));
    }
    return body;
  }

  visitBranch(node: Branch, params: any[]) {
    let ifBranch: IfBranch[] = [];
    for (let branch of node.branches) {
      let branchCode: IfBranch = this.visit(branch, params);
      ifBranch.push(branchCode);
    }
    let haveElse = false;
    for (let i = 0; i < ifBranch.length; i++) {
      if (i == 0) {
        ifBranch[i].type = "IF";
      } else {
        if (ifBranch[i].condition.length) ifBranch[i].type = "ELSE IF";
        else if (ifBranch[i].condition.length) {
          if (!haveElse) {
            ifBranch[i].type = "ELSE";
            haveElse = true;
          } else {
            // throw new BpmnParseError(BpmnParseErrorCode["Have 2 else branch - missing condition"], node.join || "")
          }
        }
      }
    }
    return [new If(ifBranch)];
  }

  visitIfBranchBlock(node: IfBranchBlock, params: any[]) {
    let body: BodyItem[] = this.visit(node.sequence, params);
    let condition = ""; // Get condition from properties
    return new IfBranch("IF", condition, body);
  }

  visitBlankBlock(node: BlankBlock, params: any[]) {
    let activityID = node.bpmnId
    let property = this.properties.get(activityID)?.properties;
    if (!property) {
      let body = [] as BodyItem[];
      for (let item of node.block) {
        body = body.concat(this.visit(item, params));
      }
      return body;
    }else {
      if(property.activityPackage !== "Control") {
        throw new BpmnParseError(BpmnParseErrorCode["Invalid Property"], activityID)
      }
      let args = property.arguments
      let List = args.List
      let Item = args.Item

      let body = [] as BodyItem[];
      for (let item of node.block) {
        body = body.concat(this.visit(item, params));
      }

      return new For([new ProcessVariable(Item)], "IN", [new ProcessVariable(List)], body);
    }
  }
}
