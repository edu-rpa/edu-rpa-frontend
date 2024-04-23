import { array } from "prop-types";
import { VariableError, VariableErrorCode } from "../error";
import _ from "lodash";
import { VariableType } from "@/types/variable";

/**
 * Keyword
 */
export abstract class BodyItem {
  abstract toJSON(): any;
}

export class Keyword extends BodyItem {
  constructor(
    public name: string,
    public args: Argument[],
    public assigns: ProcessVariable[]
  ) {
    super();
  }
  toJSON() {
    let args = this.args.map((item) => item.toJSON());
    let assignsVarName = this.assigns.map((item) => {
      let i = item.toJSON()
      if (typeof i === "string") {
        return i
      }else {
        return i.name
      }
    });

    let assigns: string[] = []
    if (assignsVarName.length > 0) {
      for (let i = 0; i < assignsVarName.length - 1; i++) {
        assigns.push(assignsVarName[i]);
      }
      assigns.push(assignsVarName.at(-1) + "=");
    }
    return {
      name: this.name,
      args,
      assign: assigns,
    };
  }
}

export class GoogleCredentialKeyword extends Keyword {
  constructor(credentialFilePath: string) {
    super('Set up OAuth token in vault', [new Argument('token_file_path',credentialFilePath)], []);
  }
}

export class Argument {
  constructor(public name: string, public value: string) {}
  toJSON() {
    return `${this.name}=${this.value}`;
    // return `${this.value}`;
  }

}

export class ProcessVariable {
  constructor(
    public name: string,
    public value?: any | any[],
    public type?: string
  ) {
    if(/[^\w\s]/.test(name)) {
      console.log(name)
      throw new VariableError(VariableErrorCode["Invalid Variable Name - Variable Contain Special Character"], this.name)
    }
  }
  toJSON() {
    // Transform name to robotframework variable definition
    // $ For scalar
    // @ For List
    // & For Dictionary

    switch(this.type) {
      case VariableType.List:
        this.name =  "@{"+this.name.replace(/[^\w\s]/gi, '')+"}"
        break
      case VariableType.DocumentTemplate:
        // Document Template is kind of dictionary
      case VariableType.Dictionary:
        this.name =  "&{"+this.name.replace(/[^\w\s]/gi, '')+"}"
        break
      default:
        this.name =  "${"+this.name.replace(/[^\w\s]/gi, '')+"}"
    }

    if (_.isNil(this.value)) {
      if(this.type === "string") {
        this.value = ""
      }
    }
    else if (Array.isArray(this.value)) {
      if (this.type !== "list")
        throw new VariableError(
          VariableErrorCode["Incompatible Type"],
          this.name
        );
      this.value = this.value.map((v) => JSON.stringify(v));
    } else if (typeof this.value === "object") {
      if (this.type !== "dictionary" && this.type !== "template")
        throw new VariableError(
          VariableErrorCode["Incompatible Type"],
          this.name
        );
      this.value = Object.keys(this.value).map(
        (k) => `${k}=${JSON.stringify(this.value[k])}`
      );
    } else {
      this.value = [this.value];
    }

    return {
      name: this.name,
      value: this.value,
    };
  }
}

/**
 * Control Sequence
 */
export type BranchType = "IF" | "ELSE IF" | "ELSE";
export class IfBranch {
  constructor(
    public type: BranchType,
    public condition: string,
    public body: BodyItem[]
  ) {}
  toJSON() {
    return {
      type: this.type,
      condition: this.condition,
      body: this.body.map((bodyItem) => bodyItem.toJSON()),
    };
  }
}

export class If extends BodyItem {
  constructor(public body: IfBranch[]) {
    super();
  }
  toJSON() {
    return {
      type: "IF/ELSE ROOT",
      body: this.body.map((bodyItem) => bodyItem.toJSON()),
    };
  }
}

export class For extends BodyItem {
  constructor(
    public variables: ProcessVariable[],
    public flavor: "IN" | "IN RANGE",
    public values: ProcessVariable[],
    public body: BodyItem[],
    public start?: string,
    public mode?: string,
    public fill?: string
  ) {
    super();
  }

  toJSON() {
    return {
      type: "FOR",
      variables: this.variables.map((v) => {
        let i = v.toJSON()
        if(typeof i === "string") 
          return i
        else 
          return i.name
      }),
      values: this.values.map((v) => {
        let i = v.toJSON()
        if(typeof i === "string") 
          return i
        else 
          return i.name
      }),
      flavor: this.flavor,
      body: this.body.map((item) => item.toJSON()),
      start: this.start,
      mode: this.mode,
      fill: this.fill,
    };
  }
}

/**
 * Overall
 */
export class Test {
  constructor(public name: string, public body: BodyItem[]) {}
  toJSON() {
    return {
      name: this.name,
      body: this.body.map((item) => item.toJSON()),
    };
  }
}

export class Resource {
  public constructor(
    public imports: Lib[],
    public variables: ProcessVariable[]
  ) {}

  toJSON() {
    return {
      imports: this.imports.map((v) => v.toJSON()),
      variables: this.variables.map((v) => v.toJSON()),
    };
  }
}

export class Lib {
  constructor(public name: string) {}
  toJSON() {
    return {
      type: "LIBRARY",
      name: this.name,
    };
  }
}

export class Robot {
  constructor(
    public name: string,
    public tests: Test[],
    public resource: Resource
  ) {}

  toJSON() {
    return {
      name: this.name,
      tests: this.tests.map(t => t.toJSON()),
      resource: this.resource.toJSON(),
    };
  }
}
