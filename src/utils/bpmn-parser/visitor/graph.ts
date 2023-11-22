import { DirectedGraph } from "typescript-graph";

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