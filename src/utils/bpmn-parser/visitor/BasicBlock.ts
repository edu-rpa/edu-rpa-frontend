import { BpmnNode } from "../model/bpmn";

export class Block {}

export class Sequence {
    constructor(
        public block: (BpmnNode|Branch)[] = []
    ) {}
}

export class Branch extends Block {
    constructor(
        public start: string,
        public braches : Block[] = [],
    ) {
        super()
    }
}

