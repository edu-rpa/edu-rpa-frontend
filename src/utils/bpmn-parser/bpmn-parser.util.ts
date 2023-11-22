import { Bpmn, Convert } from '.';
import { BpmnElement } from './model/bpmn.dto';
import {
  BpmnEndEvent,
  BpmnExclusiveGateway,
  BpmnFlow,
  BpmnStartEvent,
  BpmnTask,
  BpmnProcess,
  BpmnNode,
  BpmnSubProcess
} from "./model/bpmn";

import { DirectedAcyclicGraph } from "typescript-graph";
import { BpmnParseError, BpmnParseErrorCode } from "./error";
import { CustomGraph, GraphVisitor } from "./visitor/graph";
import { Branch, Sequence } from "./visitor/BasicBlock";
import { Properties } from './model/properties.model';

var convert = require('xml-js');
var options = { ignoreComment: true, alwaysChildren: true };
if (typeof window === 'undefined') {
  var fs = require('fs'); // Comment When run
}
export class BpmnParser {
  constructor() {}

  public parse(fileName: string, properties: Properties[]) {
    // Convert XML to JSON Format
    let xml = fs.readFileSync(fileName, 'utf8');
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
    let g = new ConcreteGraphVisitor(bpmnProcess);
    let sequence = g.buildGraph().buildBasicBlock();
    return sequence;
  }

  public parseXML(xml: string) {
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
    let g = new ConcreteGraphVisitor(bpmnProcess);
    let sequence = g.buildGraph().buildBasicBlock();
    return sequence;
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
          let bpmnSubprocess: BpmnSubProcess = new BpmnSubProcess(element);
          process.elements[bpmnSubprocess.id] = bpmnSubprocess;
          this.parseElement(element.elements, bpmnSubprocess);
          bpmnSubprocess.check();
          break;
        default:
      }
    });
  }
}

class ConcreteGraphVisitor extends GraphVisitor {
  graph: CustomGraph<BpmnNode>;
  haveCycle: boolean;
  splitNode: string[];
  joinNode: string[];
  visited: string[];
  source: string;
  sink: string;

  constructor(public process: BpmnProcess) {
    super();
    this.graph = new CustomGraph<BpmnNode>((n: BpmnNode) => n.id);
    this.haveCycle = false;
    this.splitNode = [];
    this.joinNode = [];
    this.visited = [];
    this.source = '';
    this.sink = '';
  }

  buildGraph() {
    let nodes = this.process.elements;
    let edges = this.process.flows;
    this.source =
      Object.values(nodes).find((node) => node instanceof BpmnStartEvent)?.id ||
      '';

    this.sink =
      Object.values(nodes).find((node) => node instanceof BpmnEndEvent)?.id ||
      '';

    // Build Graph
    Object.keys(nodes).forEach((nodeId: string) =>
      this.graph.insert(nodes[nodeId])
    );
    Object.values(edges).forEach((edge) =>
      this.graph.addEdge(edge.source, edge.target)
    );

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
        BpmnParseErrorCode['Detected Loop in Process - Unsupported'],
        this.process.id
      );
    }

    // Source and Sink must connect
    if (!this.graph.canReachFrom(this.source, this.sink)) {
      throw new BpmnParseError(
        BpmnParseErrorCode[
          'Invalid Workflow - start and end event not connect'
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
          'Invalid Struture - Flow Must Follow From End To Start'
        ],
        this.process.id
      );
    }
  }

  buildBasicBlock() {
    let sequence = this.dfs(this.source);
    return sequence;
  }

  visitBpmnTask(node: BpmnTask, sequence: Sequence) {
    let nodeId = node.id;
    let adjacent = this.graph.getAdjacent(nodeId);
    if(this.visited.includes(nodeId))
      return { sequence, joinNodeId: nodeId };
    this.visited.push(nodeId)

    if (
      this.joinNode.includes(nodeId)
    ) {
      // Task is Join Node - Ignore First Time Visit Until All Branch Visited
      let curBlock = sequence.block.at(-1)
      if(curBlock instanceof Branch && curBlock.join == nodeId) {
        sequence.block.push(node);
        return this.visit(this.graph.getNode(adjacent[0]), sequence)
      }
      if((sequence.scope && sequence.scope instanceof Branch))
        return { sequence, joinNodeId: nodeId };
    }
    sequence.block.push(node);
    return this.visit(this.graph.getNode(adjacent[0]), sequence);
  }

  visitBpmnExclusiveGateway(node: BpmnExclusiveGateway, sequence: Sequence) {
    let nodeId = node.id;
    let adjacent = this.graph.getAdjacent(nodeId);
    if(this.visited.includes(nodeId))
      return { sequence, joinNodeId: nodeId };
    this.visited.push(nodeId)

    if (this.splitNode.includes(nodeId)) {
      let curBlock = new Branch(nodeId, null);
      let joinNodeId: string = "";

      // Visit all branch except join node
      for (let n of adjacent) {
        let { sequence: branchSequence, joinNodeId: branchJoinNodeId } =
          this.visit(this.graph.getNode(n), new Sequence([], curBlock));
        curBlock.braches.push(branchSequence);
        joinNodeId = branchJoinNodeId;
      }
      curBlock.join = joinNodeId // Set join node of branching
      // Visit Join Node
      this.visited = this.visited.filter((e) => e != joinNodeId);
      sequence.block.push(curBlock);
      return  this.visit(this.graph.getNode(joinNodeId), sequence);    
    } else if (this.joinNode.includes(nodeId)) {
      let curBlock = sequence.block.at(-1);
      if(curBlock instanceof Branch && curBlock.join == nodeId) {
        return this.visit(this.graph.getNode(adjacent[0]), sequence)
      }
      return { sequence, joinNodeId: nodeId };
    }
  }

  visitBpmnEndEvent(node: BpmnEndEvent, sequence: Sequence) {
    let nodeId = node.id
    if(this.visited.includes(nodeId))
      return { sequence, joinNodeId: nodeId };
    this.visited.push(nodeId)

    return { sequence, joinNodeId: nodeId };
  }

  visitBpmnStartEvent(node: BpmnStartEvent, sequence: Sequence) {
    let nodeId = node.id;
    let adjacent = this.graph.getAdjacent(nodeId);
    if(this.visited.includes(nodeId))
      return { sequence, joinNodeId: nodeId };
    this.visited.push(nodeId)

    return this.visit(this.graph.getNode(adjacent[0]), sequence)
  }

  visitBpmnSubProcess(node: BpmnSubProcess, sequence: Sequence) {
    let nodeId = node.id
    let adjacent = this.graph.getAdjacent(nodeId);
    if(this.visited.includes(nodeId))
      return { sequence, joinNodeId: nodeId };
    this.visited.push(nodeId)
    let subProcessSequence = new ConcreteGraphVisitor(node).buildGraph().buildBasicBlock()
    sequence.block.push(subProcessSequence)
    return this.visit(this.graph.getNode(adjacent[0]), sequence)
  }

  dfs(nodeId: string) {
    let sequence: Sequence = new Sequence();
    this.visited = []; // Reset the visited array for each traversal.
    this.visit(this.graph.getNode(nodeId), sequence); // Start the traversal from the initial node.
    return sequence;
  }
}
