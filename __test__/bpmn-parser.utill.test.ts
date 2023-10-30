import { Bpmn2RbtParser } from "@/utils/bpmn-parser/bpmn-2-rbt-parser.utils";
import { BpmnParser } from "@/utils/bpmn-parser/bpmn-parser.util";
import { BpmnParseError } from "@/utils/bpmn-parser/error";
import { Sequence } from "@/utils/bpmn-parser/visitor/BasicBlock";
import { log } from "console";
var fs = require("fs");

describe("BPMN Test", () => {
  it("Not Normalize Form Split-Join", () => {
    let testcase = 5
    let fileName = `__test__/bpmn/${testcase}.xml`
    let sequence = new BpmnParser().parse(`__test__/bpmn/${testcase}.xml`);
    let result = sequence.toString(0)
    writeResult(fileName, sequence)
  }); 


  /* it("Test", () => {
    expect(() => new BpmnParser().parse("__test__/bpmn/1.xml")).toThrow(
      BpmnParseError
    );
  });

  it("Normalize form Split-Join", () => {
    let testcase = 2
    let fileName = `__test__/bpmn/${testcase}.xml`
    let sequence = new BpmnParser().parse(`__test__/bpmn/${testcase}.xml`);
    let result = sequence.toString(0)
    writeResult(fileName, sequence)
    let expected = fs.readFileSync(`__test__/bpmn/expected/${testcase}.txt`, "utf8")
    expect(result).toEqual(expected)
  });

  it("Nested Branching", () => {
    let testcase = 3
    let fileName = `__test__/bpmn/${testcase}.xml`
    let sequence = new BpmnParser().parse(`__test__/bpmn/${testcase}.xml`);
    let result = sequence.toString(0)
    writeResult(fileName, sequence)
    // expect(JSON.stringify(process, null, 2)).toEqual(JSON.stringify(expected, null, 2))
  });

  it("Have Loop", () => {
    const t = () => new BpmnParser().parse("__test__/bpmn/4.xml");
    expect(t).toThrow(BpmnParseError);
    expect(t).toThrow("Detected Loop in Process - Unsupported");
  });

  it("Middle Break Or Return", () => {
    let t = () => new BpmnParser().parse("__test__/bpmn/6.xml");
    // expect(t).toThrow(TypeError)
  });

  it("Not Normalize 1", () => {
    let testcase = 7
    let fileName = `__test__/bpmn/${testcase}.xml`
    let sequence = new BpmnParser().parse(`__test__/bpmn/${testcase}.xml`);
    let result = sequence.toString(0)
    writeResult(fileName, sequence)
    // expect(JSON.stringify(process, null, 2)).toEqual(JSON.stringify(expected, null, 2))
  });

  it("Have Many Endpoint => Return", () => {}) */
});

function writeResult(fileName:string, sequence: Sequence)  {
  fs.writeFile(
    `__test__/bpmn/results/${fileName.split("/").at(-1)?.split(".")[0]}.txt`,
    sequence.toString(0),
    "utf8",
    () => {}
  );
}
