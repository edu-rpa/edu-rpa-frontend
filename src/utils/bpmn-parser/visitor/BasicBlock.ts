import { log } from "console";
import { BpmnNode } from "../model/bpmn";

export type SequenceItem = BpmnNode | Branch | Sequence | IfBranchBlock ;
export class Block {
  accept(visitor: any, param: any) {
    // visitor: Visitor
    let method_name = `visit${this.constructor.name}`;
    return visitor[method_name](this, param); // this is current class
  }
}

export class Sequence extends Block {
  constructor(public block: SequenceItem[] = [], public scope?: Branch) {
    super();
  }
  public toString(indent: number): string {
    return this.block
      .map((b) => {
        return b.toString(indent);
      })
      .join("\n");
  }
}

export class BlankBlock extends Sequence {
  constructor(public bpmnId: string, sequence: Sequence) {
    super(sequence.block, sequence.scope);
  }
  public toString(indent: number): string {
    return `BlankBlock: ${this.bpmnId}\n` + this.block
      .map((b) => {
        return b.toString(indent + 1);
      })
      .join("\n");
  }
}

export class IfBranchBlock extends Block{
  constructor(public sequence: Sequence, public conditionId: string) {
    super();
  }
  toString(indent: number): string {
    return this.sequence.block
      .map((b) => {
        return b.toString(indent);
      })
      .join("\n");
  }
}


export class Branch extends Block {
  constructor(
    public split: string,
    public join: string | null,
    public branches: IfBranchBlock[] = []
  ) {
    super();
  }
  public toString(indent: number): string {
    let branchCode = "";
    for (let i = 0; i < this.branches.length; i++) {
      if (i == 0) {
        branchCode += genIndent(indent, `IF: ${this.split}\n`);
      } else if (i == this.branches.length - 1) {
        branchCode += genIndent(indent, "ELSE:") + "\n";
      } else {
        branchCode += genIndent(indent, "ELSE IF:") + "\n";
      }
      branchCode += this.branches[i].sequence.block.length
        ? this.branches[i].toString(indent + 1)
        : genIndent(indent + 1, "[Empty]");
      branchCode += "\n";
    }
    return branchCode;
  }
}

export function genIndent(indentLevel: number, line: string): string {
  let indent = "\t".repeat(indentLevel);
  return indent + line;
}
