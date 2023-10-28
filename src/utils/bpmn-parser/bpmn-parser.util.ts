import { Bpmn, Convert } from ".";
import { BpmnElement } from "./model/bpmn.dto";
import {
  BpmnEndEvent,
  BpmnExclusiveGateway,
  BpmnFlow,
  BpmnStartEvent,
  BpmnSubprocess,
  BpmnTask,
  BpmnProcess,
  BpmnNode,
} from "./model/bpmn";

import { DirectedAcyclicGraph } from "typescript-graph";
import { log } from "console";
import { BpmnParseError } from "./error";
import { CustomGraph } from "./visitor/graph";
import { Edge } from "typescript-graph/dist/types/graph";
var convert = require("xml-js");
var fs = require("fs");
var options = { ignoreComment: true, alwaysChildren: true };

export class BpmnParser {
  constructor() {}

  public parse(fileName: string): BpmnProcess {
    // Convert XML to JSON Format
    let xml = fs.readFileSync(fileName, "utf8");
    let result = convert.xml2js(xml, options);
    let bpmn: Bpmn = Convert.toBpmn(JSON.stringify(result));

    // Conver JSON To BpmnObject
    let process = bpmn.elements[0].elements.filter((e) =>
      e.name.includes("process")
    )[0];
    const process_name = process.name;
    const process_attributes = process.attributes;
    let bpmnProcess = new BpmnProcess(process_name, process_attributes.id);
    this.parseElement(process.elements as BpmnElement[], bpmnProcess);
    bpmnProcess.check();

    // Component Analyze: Detect control sequence If Branch
    let g = new GraphVisitor(bpmnProcess);
    g.buildGraph();

    return bpmnProcess;
  }

  private parseElement(elements: BpmnElement[], process: BpmnProcess) {
    elements.forEach((element) => {
      switch (true) {
        case element.name.includes("startEvent"):
          let startEvent = new BpmnStartEvent(element);
          process.elements[startEvent.id] = startEvent;
          break;
        case element.name.includes("endEvent"):
          let endEvent = new BpmnEndEvent(element);
          process.elements[endEvent.id] = endEvent;
          break;
        case element.name.includes("task"):
          let bpmnTask: BpmnTask = new BpmnTask(element);
          process.elements[bpmnTask.id] = bpmnTask;
          break;
        case element.name.includes("exclusiveGateway"):
          let bpmnExclusiveGateway: BpmnExclusiveGateway =
            new BpmnExclusiveGateway(element);
          process.elements[bpmnExclusiveGateway.id] = bpmnExclusiveGateway;
          break;
        case element.name.includes("sequenceFlow"):
          let bpmnFlow: BpmnFlow = new BpmnFlow(element);
          process.flows[bpmnFlow.id] = bpmnFlow;
          break;
        case element.name.includes("subProcess"):
          let bpmnSubprocess: BpmnSubprocess = new BpmnSubprocess(element);
          process.elements[bpmnSubprocess.id] = bpmnSubprocess;
          this.parseElement(element.elements, bpmnSubprocess);
          bpmnSubprocess.check();
          break;
        default:
      }
    });
  }
}

class GraphVisitor {
  graph: CustomGraph<BpmnNode>;
  haveCycle: boolean;
  splitNode: string[];
  joinNode: string[];
  ifStart: string[];
  visited: string[];
  nodes: Map<string, BpmnNode>;
  adjacency: Edge[][];
  source: string;
  sink: string;

  constructor(public process: BpmnProcess) {
    this.graph = new CustomGraph<BpmnNode>((n: BpmnNode) => n.id);
    this.haveCycle = false;
    this.splitNode = [];
    this.joinNode = [];
    this.ifStart = [];
    this.visited = [];
    this.nodes = new Map();
    this.adjacency = [[]];
    this.source = "";
    this.sink = "";
  }
  buildGraph() {
    let nodes = this.process.elements;
    let edges = this.process.flows;
    this.source =
      Object.values(nodes).find((node) => node instanceof BpmnStartEvent)?.id ||
      "";
    this.sink =
      Object.values(nodes).find((node) => node instanceof BpmnEndEvent)?.id ||
      "";

    // Build Graph
    Object.keys(nodes).forEach((nodeId: string) =>
      this.graph.insert(nodes[nodeId])
    );
    Object.values(edges).forEach((edge) =>
      this.graph.addEdge(edge.source, edge.target)
    );

    this.nodes = this.graph.getNodesMap();
    this.adjacency = this.graph.getAdjacency();

    // Check Graph Condition
    this.check();

    // Initialize Split and Join Node List
    this.splitNode = this.graph
      .getNodes()
      .map((node) => node.id)
      .filter((nodeid) => this.graph.outDegreeOfNode(nodeid) > 1);
    this.joinNode = this.graph
      .getNodes()
      .map((node) => node.id)
      .filter((nodeid) => this.graph.indegreeOfNode(nodeid) > 1);
    console.log("Split:", this.splitNode);
    console.log("Join:", this.joinNode);

    this.haveCycle = !this.graph.isAcyclic();

    if (!this.haveCycle) {
      const topoSortArray = DirectedAcyclicGraph.fromDirectedGraph(
        this.graph
      ).topologicallySortedNodes();
      /**
       * Split: 1 in - many out
       * Join:  many in - 1 out
       */
      if (
        !(topoSortArray[0] instanceof BpmnStartEvent) &&
        !(topoSortArray[topoSortArray.length - 1] instanceof BpmnEndEvent)
      ) {
        throw new BpmnParseError("Invalid Struture - Flow Must Follow From End To Start", this.process.id);
      }

      let str = "";
      let indent = "";
      for (let node of topoSortArray) {
        let nodeId = node.id;

        if (node instanceof BpmnTask) {
          if (this.joinNode.includes(nodeId)) {
            indent = indent.slice(1);
            str += indent + `END ${nodeId}\n`;
          }
          str += indent + `${nodeId}\n`;
        } else if (node instanceof BpmnExclusiveGateway) {
          if (
            this.splitNode.includes(nodeId) &&
            this.joinNode.includes(nodeId)
          ) {
            throw new BpmnParseError("Both a split node and a join node", nodeId)
          } else if (this.splitNode.includes(nodeId)) {
            this.ifStart.push(nodeId);
            str += indent + `IF ${nodeId}\n`;
            indent += "\t";
          } else if (this.joinNode.includes(nodeId)) {
            indent = indent.slice(1);
            str += indent + `END ${nodeId}\n`;
          }
        }
      } 

      console.log(str);
    }else {
      throw new BpmnParseError("Detected Loop in Process - Unsupported", this.process.id)
    }
    return this;
  }

  private check() {
    if (!this.graph.canReachFrom(this.source, this.sink)) {
      throw new BpmnParseError(
        "Invalid Workflow - start and end event not connect",
        this.process.id
      );
    }
  }

  vistit(nodeId: string) {
    if (this.visited.includes(nodeId)) return;
    this.visited.push(nodeId);
    let nodeIdentities = Array.from(this.nodes.keys());
    let indexOfNode = nodeIdentities.indexOf(nodeId);
    let adjacent = this.adjacency[indexOfNode].map((i) => nodeIdentities[i]);
    for (let node of adjacent) {
      if (!this.visited.includes(node)) this.vistit(node);
    }
  }

  dfs(nodeId: string) {
    this.visited.push(nodeId);
    let nodeIdentities = Array.from(this.nodes.keys());
    let indexOfNode = nodeIdentities.indexOf(nodeId);
    let adjacent = this.adjacency[indexOfNode].map((i) => nodeIdentities[i]);
    for (let node of adjacent) {
      this.vistit(node);
    }
  }

  private nhap() {
    // DFS
    // Directed Graph - 1 sink and 1 source
    let stack = [this.source];
    let traverseStr = "";

    while (stack.length) {
      let nodeId = stack.pop();
      if (!nodeId) break;
      if (this.visited.includes(nodeId)) continue;
      this.visited.push(nodeId);
      traverseStr += nodeId?.toString() + "\n";

      let nodeIdentities = Array.from(this.nodes.keys());
      let indexOfNode = nodeIdentities.indexOf(nodeId);
      let adjacent = this.adjacency[indexOfNode]
        .map((value, index) => (value ? index : -1))
        .filter((i) => i != -1)
        .map((i) => nodeIdentities[i]);
      stack = stack.concat(adjacent);
    }
    console.log(traverseStr);
  }
}
