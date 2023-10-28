import { Bpmn2RbtParser } from "@/utils/bpmn-parser/bpmn-2-rbt-parser.utils";
import { BpmnParser } from "@/utils/bpmn-parser/bpmn-parser.util";
import { BpmnParseError } from "@/utils/bpmn-parser/error";
import { log } from "console";
var fs = require("fs");
var options = { ignoreComment: true, alwaysChildren: true };

describe("BPMN Test", () => {
  it("Test", () => {
    expect(() => new BpmnParser().parse("__test__/bpmn/1.xml")).toThrow(
      BpmnParseError
    );
  });

  it("Normalize form Split-Join", () => {
    let testcase = 2
    let process = new BpmnParser().parse(`__test__/bpmn/${testcase}.xml`);   
    let raw= fs.readFileSync(`__test__/bpmn/expected/${testcase}.json`, "utf8")
    let expected = JSON.parse(raw)
    expect(JSON.stringify(process, null, 2)).toEqual(JSON.stringify(expected, null, 2))
  });

  it("Nested Branching", () => {
    let testcase = 3
    let process = new BpmnParser().parse(`__test__/bpmn/${testcase}.xml`);   
    let raw= fs.readFileSync(`__test__/bpmn/expected/${testcase}.json`, "utf8");
    let expected = JSON.parse(raw)
    expect(JSON.stringify(process, null, 2)).toEqual(JSON.stringify(expected, null, 2))
  });

  it("Have Loop", () => {
    const t = () => new BpmnParser().parse("__test__/bpmn/4.xml");
    expect(t).toThrow(BpmnParseError);
    expect(t).toThrow("Detected Loop in Process - Unsupported");
  });

  it("Not Normalize Form Split-Join", () => {
    let process = new BpmnParser().parse("__test__/bpmn/5.xml");
  });

  it("Middle Break Or Return", () => {
    let t = () => new BpmnParser().parse("__test__/bpmn/6.xml");
    expect(t).toThrow(TypeError)
  });

  it("Not Normalize 1", () => {
    let process = new BpmnParser().parse("__test__/bpmn/7.xml");
    let raw= fs.readFileSync("__test__/bpmn/expected/7.json", "utf8")
    let expected = JSON.parse(raw)
    expect(JSON.stringify(process, null, 2)).toEqual(JSON.stringify(expected, null, 2))
  });

  it("Have Many Endpoint => Return", () => {})
});
