import { Bpmn, Convert } from '.';
import { BpmnElement } from './model/bpmn.dto';
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
import { BpmnParseError, BpmnParseErrorCode } from "./error";
import { CustomGraph } from "./visitor/graph";
import { Edge } from "typescript-graph/dist/types/graph";
import { Block, Branch, Sequence } from "./visitor/BasicBlock";
import { join } from "path";

var convert = require("xml-js");
var fs = require("fs");
var options = { ignoreComment: true, alwaysChildren: true };

export class BpmnParser {
  constructor() {}

  public parse(fileName: string) {
    // Convert XML to JSON Format
    let xml = fs.readFileSync(fileName, "utf8");
    let result = convert.xml2js(xml, options);
    let bpmn: Bpmn = Convert.toBpmn(JSON.stringify(result));

    // Conver JSON To BpmnObject
    let process = bpmn.elements[0].elements.filter((e) =>
      e.name.includes('process')
    )[0];
    const process_name = process.name;
    const process_attributes = process.attributes;
    let bpmnProcess = new BpmnProcess(process_name, process_attributes.id);
    this.parseElement(process.elements as BpmnElement[], bpmnProcess);
    bpmnProcess.check();

    // Component Analyze: Detect control sequence If Branch
    let g = new GraphVisitor(bpmnProcess);
    let block = g.buildGraph().buildBasicBlock();
    fs.writeFile(
      `__test__/bpmn/results/${fileName.split("/").at(-1)?.split(".")[0]}.json`,
      JSON.stringify(block, null, 2),
      "utf8",
      () => {}
    );
    return block;
  }

  private parseElement(elements: BpmnElement[], process: BpmnProcess) {
    elements.forEach((element) => {
      switch (true) {
        case element.name.includes('startEvent'):
          let startEvent = new BpmnStartEvent(element);
          process.elements[startEvent.id] = startEvent;
          break;
        case element.name.includes('endEvent'):
          let endEvent = new BpmnEndEvent(element);
          process.elements[endEvent.id] = endEvent;
          break;
        case element.name.includes('task'):
          let bpmnTask: BpmnTask = new BpmnTask(element);
          process.elements[bpmnTask.id] = bpmnTask;
          break;
        case element.name.includes('exclusiveGateway'):
          let bpmnExclusiveGateway: BpmnExclusiveGateway =
            new BpmnExclusiveGateway(element);
          process.elements[bpmnExclusiveGateway.id] = bpmnExclusiveGateway;
          break;
        case element.name.includes('sequenceFlow'):
          let bpmnFlow: BpmnFlow = new BpmnFlow(element);
          process.flows[bpmnFlow.id] = bpmnFlow;
          break;
        case element.name.includes('subProcess'):
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
    this.haveCycle = !this.graph.isAcyclic();

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
    return this;
  }


  private check() {
    if (this.haveCycle) {
      throw new BpmnParseError(
        BpmnParseErrorCode["Detected Loop in Process - Unsupported"],
        this.process.id
      );
    }

    // Source and Sink must connect
    if (!this.graph.canReachFrom(this.source, this.sink)) {
      throw new BpmnParseError(
        BpmnParseErrorCode[
          "Invalid Workflow - start and end event not connect"
        ],
        this.process.id
      );
    }
    // Check if start is StartEvent and end is EndEvent
    const topoSortArray = DirectedAcyclicGraph.fromDirectedGraph(
      this.graph
    ).topologicallySortedNodes();
    if (
      !(topoSortArray[0] instanceof BpmnStartEvent) &&
      !(topoSortArray[topoSortArray.length - 1] instanceof BpmnEndEvent)
    ) {
      throw new BpmnParseError(
        BpmnParseErrorCode[
          "Invalid Struture - Flow Must Follow From End To Start"
        ],
        this.process.id
      );
    }
  }
  buildBasicBlock() {
    let sequence = this.dfs(this.source);
    return sequence;
  }

  visit(
    nodeId: string,
    sequence: Sequence
  ): { sequence: Sequence; joinNodeId: string } {
    if (this.visited.includes(nodeId)) return { sequence, joinNodeId: nodeId };
    this.visited.push(nodeId);
    let adjacent = this.graph.getAdjacent(nodeId);
    let node = this.graph.getNode(nodeId);

    if (node instanceof BpmnTask) {
      if (
        this.joinNode.includes(nodeId) &&
        !(sequence.block.at(-1) instanceof Branch)
      ) {
        return { sequence, joinNodeId: nodeId };
      }
      sequence.block.push(node);
      return this.visit(adjacent[0], sequence);
    } else if (node instanceof BpmnExclusiveGateway) {
      if (this.splitNode.includes(nodeId)) {
        let curBlock = new Branch(nodeId);
        let joinNodeId: string = "";
        for (let n of adjacent) {
          let { sequence: branchSequence, joinNodeId: branchJoinNodeId } =
            this.visit(n, new Sequence());
          curBlock.braches.push(branchSequence);
          joinNodeId = branchJoinNodeId;
        }
        this.visited = this.visited.filter((e) => e != joinNodeId);
        sequence.block.push(curBlock);
        this.visit(joinNodeId, sequence); // May be affected by for loop ?
        let joinNodeAdjacent = this.graph.getAdjacent(joinNodeId);
        return this.visit(joinNodeAdjacent[0], sequence);
      } else if (this.joinNode.includes(nodeId)) {
        return { sequence, joinNodeId: nodeId };
      }
    } else if (node instanceof BpmnEndEvent) {
      return { sequence, joinNodeId: nodeId };
    }
    return this.visit(adjacent[0], sequence);
  }

  dfs(nodeId: string) {
    let sequence: Sequence = new Sequence();
    this.visited = []; // Reset the visited array for each traversal.
    this.visit(nodeId, sequence); // Start the traversal from the initial node.

    return sequence;
  }
}
