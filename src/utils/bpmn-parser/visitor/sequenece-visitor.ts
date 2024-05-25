import { Variable, VariableType } from "@/types/variable";
import {
  BpmnParseError,
  BpmnParseErrorCode,
} from "../error";
import { BpmnTask } from "../model/bpmn";
import {
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
  If,
  IfBranch,
  Keyword,
  Lib,
  ProcessVariable,
  Resource,
  Robot,
  Test,
} from "./robot";
import { AuthorizationProvider } from "@/interfaces/enums/provider.enum";
import _ from "lodash";
import { LibrabryConfigurations } from "@/constants/activityPackage";

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
    let librabries =  Array.from(this.imports).map((libName) => new Lib(libName, LibrabryConfigurations[libName]));
    let resource = new Resource(
      librabries,
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
    let returnedValue = "";
    switch(type) {
      case VariableType.DocumentTemplate:
      case VariableType.Dictionary:
      case VariableType.List:
        returnedValue =  `\${{ ${value} }}`
        break;
      default:
        returnedValue = value
    }

    // relace true => True, false => False
    returnedValue = returnedValue.replace(/\btrue\b/g, "True").replace(/\bfalse\b/g, "False");

    return returnedValue
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
        }else if(arg.keywordArg === null && arg.value) {
          // keywordArg empty ==> pass by value
          keywordArg.push(new Argument("", arg.value));
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
    if(args.Librabry) {
      const library = args.Librabry?.value;
      if (library) {
        this.imports.add(library);
      }
    }

    if(args.Connection) {
      // Add connectionKey for robot
      const connectionArgs = args.Connection
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
    
    // Check branch with empty condition
    let emptyFlow = []
    ifBranch.forEach((branch, index) => {
      if(_.isEmpty(branch.condition)) {
        emptyFlow.push(node.branches[index].conditionId)
      }
    })

    if(emptyFlow.length >= 2) {
      // If there are 2 empty condition branch then it is missing configuration
      throw new BpmnParseError(BpmnParseErrorCode["Missing condition"], emptyFlow.join(","))
    }

    for (let i = 0; i < ifBranch.length; i++) {
      let branch = ifBranch[i]
      if(branch.condition.length == 0) {
        branch.type = "ELSE"
        continue
      }
      branch.type = "ELSE IF"
    }

    if(ifBranch[0].type == "ELSE") {
      ifBranch[1].type = "IF"
    }else {
      ifBranch[0].type = "IF"
    }

    return [new If(ifBranch)];
  }

  visitIfBranchBlock(node: IfBranchBlock, params: any[]) {
    let body: BodyItem[] = this.visit(node.sequence, params);
    let flowID = node.conditionId;
    let flowProperty = this.properties.get(flowID)?.properties;
    
    if(_.isEmpty(flowProperty)) {
      return new IfBranch("IF", "", body);
    }
    const flowArgument = flowProperty.arguments["Condition"];
    const flowValue = flowArgument.value;

    const oLogicConditionList = JSON.parse(flowValue);
    let conditionList = []; // Get condition from properties

    for(let oCondition of oLogicConditionList) {
      const left = oCondition["left"]
      const right = oCondition["right"]
      let logicalOperator = oCondition['logicalOperator']
      const conditionOperator = oCondition["operator"]

      if(logicalOperator.length) {
          switch(logicalOperator) {
            case "&&":
                logicalOperator ="and"
                break
            case "||":
                logicalOperator = "or"
                break
            default: 
          }
          conditionList.push(logicalOperator)
      }

      if (_.isEmpty(left) || _.isEmpty(right) || _.isEmpty(conditionOperator)) {
        throw new BpmnParseError(BpmnParseErrorCode["Missing Property"], node.conditionId)
      }

      conditionList.push(`${left} ${conditionOperator} ${right}`)
    }

    return new IfBranch("IF", conditionList.join(" "), body);
  }

  visitBlankBlock(node: BlankBlock, params: any[]) {
    let activityID = node.bpmnId;
    let property = this.properties.get(activityID)?.properties;
    if (_.isEmpty(property) || _.isNil(property.arguments.LoopType)) {
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
      switch(args.LoopType.value) {
        case 'for_each':
          let List = args.List;
          let Item = args.Item;
      
          let bodyForEach = [] as BodyItem[];
          for (let itemForEach of node.block) {
            bodyForEach = bodyForEach.concat(this.visit(itemForEach, params));
          }
      
          if (!Item.value || !List.value) {
            throw new BpmnParseError(
              BpmnParseErrorCode["Missing Property"],
              activityID
            );
          }
          let ListName = List.value.match(/{\s*(.*?)\s*}/)[1]
          let ItemName = Item.value.match(/{\s*(.*?)\s*}/)[1]
      
          let ListInStorage = this._checkVariableValid(ListName);
          let ItemInStorage = this._checkVariableValid(ItemName);
      
          return new For(
            [new ProcessVariable(ItemName, ItemInStorage.value, ItemInStorage.type)],
            "IN",
            [new ProcessVariable(ListName, ListInStorage.value, ListInStorage.type)],
            bodyForEach
          );
        case 'for_range':
          let bodyForRange = [] as BodyItem[];
          for (let itemForRange of node.block) {
            bodyForRange = bodyForRange.concat(this.visit(itemForRange, params));
          }
      
          let ItemForRange = args.Item;
          let Start = args.Start;
          let End = args.End;
      
          if (!ItemForRange.value || !Start.value || !End.value) {
            throw new BpmnParseError(
              BpmnParseErrorCode["Missing Property"],
              activityID
            );
          }
      
          let ItemNameForRange = ItemForRange.value.match(/{\s*(.*?)\s*}/)[1]
          let ItemInStorageForRange = this._checkVariableValid(ItemNameForRange);
      
          return new For(
            [new ProcessVariable(ItemNameForRange, ItemNameForRange, ItemInStorageForRange.type)],
            "IN RANGE",
            [
              Start.value,
              End.value,
            ],
            bodyForRange
          );
      }
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
