import { log } from "console";
import { BpmnNode } from "../model/bpmn";

export class Block {}

export class Sequence {
  constructor(
    public block: (BpmnNode | Branch)[] = [],
    public scope?: Branch
  ) {}
  public toString (indent: number): string {
    return this.block.map((b) => b.toString(indent)).join("\n");
  };
}

export class Branch extends Block {
  constructor(public start: string, public braches: Sequence[] = []) {
    super();
  }
  public toString (indent: number): string {
    let branchCode = "\n";
    for(let i = 0 ; i < this.braches.length; i++) {
        if(i == 0) {
            branchCode += genIndent(indent, `IF: ${this.start}\n`);
        }else if(i == this.braches.length-1) {
            branchCode += genIndent(indent, "ELSE:") + "\n";
        }else {
            branchCode += genIndent(indent, "ELSE IF:") + "\n";
        }
        branchCode += this.braches[i].toString(indent+1) + "\n"
    }
    return branchCode;
  };
}

export function genIndent(indentLevel: number, line: string): string {
  let indent = "\t".repeat(indentLevel);
  return indent + line
}
