import { BpmnNode } from "../model/bpmn";
import { Branch, Sequence } from "./BasicBlock";

export class SequenceVisitor {
    visit(node: Sequence | BpmnNode, param: any) {
        if (!node) return { sequence: param, joinNodeId: null };
        return node.accept(this, param);
    }

    visitBpmnNode(node: BpmnNode, params: any) {};
    visitSequence(node: Sequence, params: any) {};
    visitBranch(node: Branch, params: any) {};
}
