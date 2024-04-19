import { Variable, VariableType } from "@/types/variable";
import {
  BpmnParseError,
  BpmnParseErrorCode,
  CredentialProviderCode,
  VariableError,
  VariableErrorCode,
} from "../error";
import { BpmnNode, BpmnTask } from "../model/bpmn";
import {
  Arguments,
  ProcessVariables,
  Properties,
} from "../model/properties.model";
import {
  BlankBlock,
  Branch,
  IfBranchBlock,
  Sequence,
  SequenceItem,
} from "./BasicBlock";
import {
  Argument,
  BodyItem,
  For,
  GoogleCredentialKeyword,
  If,
  IfBranch,
  Keyword,
  Lib,
  ProcessVariable,
  Resource,
  Robot,
  Test,
} from "./robot";
import { ArgumentProps } from "@/types/property";
import { AuthorizationProvider, AuthorizationProviderByActivityPackage } from "@/interfaces/enums/provider.enum";

export class SequenceVisitor {
  properties: Map<string, Properties>;
  imports: Set<string>;
  variables: Variable[];

  constructor(
    public sequence: Sequence,
    properties: Properties[],
    variables: Variable[]
  ) {
    this.properties = properties.reduce((map, obj) => {
      map.set(obj.activityID, obj);
      return map;
    }, new Map<string, Properties>());
    this.imports = new Set<string>();
    this.variables = variables;
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
  private credentials : {
    provider?: AuthorizationProvider,
    connectionKey: string
  }[] = [];

  parse() {
    let name = "";
    let body: BodyItem[] = this.visit(this.sequence, []);
    let tests = [new Test("Main", body)];
    let variables: ProcessVariable[] = this.parseVariables();
    let resource = new Resource(
      Array.from(this.imports).map((i) => new Lib(i)),
      variables
    );
    let robot = new Robot(name, tests, resource);
    return robot;
  }

  getCredentials() {
    return this.credentials
  }

  parseVariables() {
    return this.variables.map((v) => {
      return new ProcessVariable(v.name, this._handleParseValue(v), v.type);
    });
  }

  private _handleParseValue(variable : Variable) {
    const {name, value, type} = variable
    switch(type) {
      case VariableType.DocumentTemplate:
      case VariableType.Dictionary:
      case VariableType.List:
        return `\${{ ${value} }}`
      default:
        return value;
    }

  }

  visitBpmnTask(node: BpmnTask, params: any[]) {
    let activityID = node.id;
    let configuration = this.properties.get(activityID)
    let property = configuration?.properties;
    const keyword = configuration.keyword; 

    if (!property)
      throw new BpmnParseError(
        BpmnParseErrorCode["Missing Property"],
        activityID
      );
    if (property.activityPackage === "Control") {
      throw new BpmnParseError(
        BpmnParseErrorCode["Invalid Property"],
        activityID
      );
    }
    const args = property.arguments;
    const assignVariable = property.return;
    const Lib = property.library;

    let keywordAssigns = [] as ProcessVariable[];
    let keywordArg = [] as Argument[];
    if (!property.activityName) {
      throw new BpmnParseError("Activity name must be specified", node.id);
    }
    if (args) {
      // parse keywords arguments
      for (let arg of Object.values(args)) {
        // Ignore empty keywords
        // Which may include special 'Connection' Argument that does not have keywordArg
        if (arg.keywordArg && arg.value) {
          keywordArg.push(new Argument(arg.keywordArg, arg.value));
        }
      }
    }

    if (assignVariable) {
      const assignVarName = assignVariable.replace(/^[^\w]{(.*)}$/, "$1");
      const variableInStorage = this._checkVariableValid(assignVarName);
      keywordAssigns.push(
        new ProcessVariable(assignVarName, variableInStorage.value, variableInStorage.type)
      );
    }

    // handle Create Lib
    if (Lib) {
      this.imports.add(Lib);
    }
    if(property.arguments.Librabry) {
      const library = property.arguments.Library?.value;
      if (library) {
        this.imports.add(library);
      }
    }

    if(property.arguments.Connection) {
      // Add connectionKey for robot
      const connectionArgs = property.arguments.Connection
      this.credentials.push({
        connectionKey: connectionArgs?.value.split('/').pop().split('.').slice(0, -1).join('.') ?? ""
      })
    }

    let keywords = [new Keyword(keyword, keywordArg, keywordAssigns)];
    return keywords;
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
    let activityID = node.bpmnId;
    let property = this.properties.get(activityID)?.properties;
    if (!property) {
      let body = [] as BodyItem[];
      for (let item of node.block) {
        body = body.concat(this.visit(item, params));
      }
      return body;
    } else {
      if (property.activityPackage !== "Control") {
        throw new BpmnParseError(
          BpmnParseErrorCode["Invalid Property"],
          activityID
        );
      }
      let args = property.arguments;
      let List = args.List;
      let Item = args.Item;

      let body = [] as BodyItem[];
      for (let item of node.block) {
        body = body.concat(this.visit(item, params));
      }

      if (!Item.value || !List.value) {
        throw new BpmnParseError(
          BpmnParseErrorCode["Missing Property"],
          activityID
        );
      }
      let ListName = List.value.replace(/^[^\w]{(.*)}$/, "$1")
      let ItemName = Item.value.replace(/^[^\w]{(.*)}$/, "$1")

      let ListInStorage = this._checkVariableValid(ListName)
      let ItemInStorage = this._checkVariableValid(ItemName)

      return new For(
        [new ProcessVariable(ListName, JSON.parse(ItemInStorage.value), ItemInStorage.type)],
        "IN",
        [new ProcessVariable(ItemName, JSON.parse(ListInStorage.value), ListInStorage.type)],
        body
      );
    }
  }

  private _checkVariableValid(varName: string) {
    const variable = this.variables.find((v) => v.name === varName);
    if (!variable) {
      throw new BpmnParseError(
        BpmnParseErrorCode["Variable Not Exist"],
        varName
      );
    }
    return variable;
  }
}
