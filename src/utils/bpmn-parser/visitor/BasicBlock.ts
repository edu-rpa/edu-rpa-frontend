import { log } from "console";
import { BpmnNode } from "../model/bpmn";

export class Block {
  accept(visitor: any,  param: any) { // visitor: Visitor
    let method_name = `visit${this.constructor.name}`
    return visitor[method_name](this,param) // this is current class
}
}

export class Sequence extends Block {
  constructor(
    public block: (BpmnNode | Branch | Sequence)[] = [],
    public scope?: Branch
  ) {
    super()
  }
  public toString (indent: number): string {
    return this.block.map((b) => {
      if(b instanceof Sequence)
        return "Sequence:\n" + b.toString(indent+1)
      return b.toString(indent)
    }).join("\n");
  };
}

export class Branch extends Block {
  constructor(public split: string, public join: string | null, public braches: Sequence[] = []) {
    super();
  }
  public toString (indent: number): string {
    let branchCode = "";
    for(let i = 0 ; i < this.braches.length; i++) {
        if(i == 0) {
            branchCode += genIndent(indent, `IF: ${this.split}\n`);
        }else if(i == this.braches.length-1) {
            branchCode += genIndent(indent, "ELSE:") + "\n";
        }else {
            branchCode += genIndent(indent, "ELSE IF:") + "\n";
        }
        branchCode += this.braches[i].block.length ? this.braches[i].toString(indent+1) :genIndent(indent+1, "[Empty]");
        branchCode += "\n";
    }
    return branchCode;
  };
}

export function genIndent(indentLevel: number, line: string): string {
  let indent = "\t".repeat(indentLevel);
  return indent + line
}
