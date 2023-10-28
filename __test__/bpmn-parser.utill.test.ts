import { Bpmn2RbtParser } from "@/utils/bpmn-parser/bpmn-2-rbt-parser.utils";
import { BpmnParser } from "@/utils/bpmn-parser/bpmn-parser.util";
import { BpmnParseError } from "@/utils/bpmn-parser/error";

describe("BPMN Test", () => {
  it("Test", () => {
    expect(() => new BpmnParser().parse("__test__/bpmn/1.xml")).toThrow(
      BpmnParseError
    );
  });

  it("Test", () => {
    let process = new BpmnParser().parse("__test__/bpmn/2.xml");
  });

  it("Test", () => {
    // Nested Branching
    let process = new BpmnParser().parse("__test__/bpmn/3.xml");
  });

  it("Test", () => {
    // Have Loop
    const t = () => new BpmnParser().parse("__test__/bpmn/4.xml");
    expect(t).toThrow(BpmnParseError);
    expect(t).toThrow("Detected Loop in Process - Unsupported");
  });

  it("Test", () => {
    // Not Normalize Form Split-Join
    let process = new BpmnParser().parse("__test__/bpmn/5.xml");
  });
});
