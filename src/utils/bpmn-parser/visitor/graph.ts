import { Block } from "@mui/icons-material";
import { DirectedGraph } from "typescript-graph";
import { BpmnNode } from "../model/bpmn";
import { Sequence } from "./BasicBlock";
import { BpmnStartEvent } from "../model/bpmn-model";

// Extends BuiltIn Graph To Add More Functionality

export class CustomGraph<T> extends DirectedGraph<T> {
    public outDegreeOfNode(nodeID: string) {
      const nodeIdentities = Array.from(this.nodes.keys());
      const indexOfNode = nodeIdentities.indexOf(nodeID);
      const outdegree = this.adjacency[indexOfNode].reduce((carry:number, value:number) => {
          return carry + (value > 0 ? 1 : 0);
      }, 0);
      return outdegree;
    }
    public getAdjacency() {
      return this.adjacency
    }
    public getNodesMap() {
      return this.nodes
    }
    public getAdjacent(nodeId: string) {
      let nodeIdentities = Array.from(this.nodes.keys());
      let indexOfNode = nodeIdentities.indexOf(nodeId);

      let adjacent = this.adjacency[indexOfNode]
          .map((value, index) => (value ? index : -1))
          .filter((i) => i != -1)
          .map((i) => nodeIdentities[i]);

      return adjacent
    }
    
}

export class GraphVisitor {
  visit(node: BpmnNode | undefined, param: any) {
    if(!node)
      return {sequence: param, joinNodeId: null}
    return node.accept(this, param)
  }

  visitBpmnTask(node: BpmnNode, sequence: Sequence) {}
  visitBpmnExclusiveGateway(node: BpmnNode, sequence: Sequence) {}
  visitBpmnEndEvent(node: BpmnNode, sequence: Sequence) {}
  visitBpmnStartEvent(node: BpmnNode, sequence: Sequence) {}
}