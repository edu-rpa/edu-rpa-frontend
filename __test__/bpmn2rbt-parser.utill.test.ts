import { BpmnParser } from "@/utils/bpmn-parser/bpmn-parser.util";
import { BpmnParseError } from "@/utils/bpmn-parser/error";
import { Sequence } from "@/utils/bpmn-parser/visitor/BasicBlock";
import { log } from "console";
import { escape, escapeRegExp } from "lodash";
var fs = require("fs");

describe("BPMN Parser Test", () => {
    it("Test", () => {
      expect(() => new BpmnParser().parse2Sequence("__test__/bpmn/1.xml")).toThrow(
        BpmnParseError
      );
    });
});

function writeResult(fileName: string, sequence: Sequence) {
  fs.writeFile(
    `__test__/bpmn/results/${fileName.split('/').at(-1)?.split('.')[0]}.txt`,
    sequence.toString(0),
    'utf8',
    () => {}
  );
}
