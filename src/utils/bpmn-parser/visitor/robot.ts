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
    public assigns: Variable[]
  ) {
    super();
  }
  toJSON() {
    let args = this.args.map((iten) => iten.toJSON());
    let assigns: string[] = [];
    if (assigns.length > 0) {
      for (let i = 0; i < this.args.length - 1; i++) {
        assigns.push(this.args[i].toJSON());
      }
      assigns.push(this.assigns.at(-1)?.toJSON() + '=');
    }
    return {
      name: this.name,
      args,
      assigns,
    };
  }
}

export class Argument {
  constructor(public name: string, public value: string) {}
  toJSON() {
    return `${this.name}=${this.value}`;
  }
}

export class Variable {
  constructor(public name: string, public value?: string[]) {}
  toJSON() {
    if (!this.value) return `${this.name}`;
    else
      return {
        name: this.name,
        value: this.value,
      };
  }
}

/**
 * Control Sequence
 */
export type BranchType = 'IF' | 'ELSE IF' | 'ELSE';
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
      type: 'IF/ELSE ROOT',
      body: this.body.map((bodyItem) => bodyItem.toJSON()),
    };
  }
}

export class For extends BodyItem {
  constructor(
    public assisgn: Variable[],
    public flavor: 'IN' | 'IN RANGE',
    public values: Variable[],
    public body: BodyItem[],
    public start?: string,
    public mode?: string,
    public fill?: string
  ) {
    super();
  }

  toJSON() {
    return {
      assisgn: this.assisgn,
      flavor: this.flavor,
      values: this.values.map((v) => v.toJSON()),
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
  public constructor(public imports: Lib[], public variables: Variable[]) {}

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
      type: 'LIBRARY',
      name: this.name,
    };
  }
}

export class Robot {
  constructor(
    public name: string,
    public tests: Test,
    public resource: Resource
  ) {}

  toJSON() {
    return {
      name: this.name,
      tests: this.tests.toJSON(),
      resource: this.resource.toJSON(),
    };
  }
}
