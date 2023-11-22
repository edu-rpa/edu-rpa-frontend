import { BpmnParser } from "@/utils/bpmn-parser/bpmn-parser.util";
import { BpmnParseError } from "@/utils/bpmn-parser/error";
import { Sequence } from "@/utils/bpmn-parser/visitor/BasicBlock";
import { log } from "console";
import { escape, escapeRegExp } from "lodash";
var fs = require("fs");

describe("BPMN Parser Test", () => {
  // describe("Exception Test", () => {
  //   it("Test", () => {
  //     expect(() => new BpmnParser().parse("__test__/bpmn/1.xml")).toThrow(
  //       BpmnParseError
  //     );
  //   });
  //   it("Have Loop", () => {
  //     const t = () => new BpmnParser().parse("__test__/bpmn/4.xml");
  //     expect(t).toThrow(BpmnParseError);
  //     expect(t).toThrow("Detected Loop in Process - Unsupported");
  //   });
  // })
  // describe("Task Test", () => {

  // })

  describe("SubProcess Test", () => {
    it("Simple SubProcess With Task", () => {
      let testcase = 9;
      let fileName = `__test__/bpmn/${testcase}.xml`;
      let expected = fs.readFileSync(
        `__test__/bpmn/expected/${testcase}.txt`,
        "utf8", 
      ).replace(/\r/g, '');
      let sequence = new BpmnParser().parse(fileName, []);
  /*     let result = sequence.toString(0); */
      // writeResult(fileName, sequence);
      // expect(result).toBe(expected);
    });

  })


  // describe("Normailize Gateway Test", () => {
  //   it("Normalize form Split-Join", () => {
  //     let testcase = 2;
  //     let fileName = `__test__/bpmn/${testcase}.xml`;
  //     let expected = fs.readFileSync(
  //       `__test__/bpmn/expected/${testcase}.txt`,
  //       "utf8", 
  //     ).replace(/\r/g, '');
  //     let sequence = new BpmnParser().parse(fileName);
  //     let result = sequence.toString(0);
  //     writeResult(fileName, sequence);
  //     expect(result).toBe(expected);
  //   });
  //   it("Nested Branching", () => {
  //     let testcase = 3;
  //     let fileName = `__test__/bpmn/${testcase}.xml`;
  //     let expected = fs.readFileSync(
  //       `__test__/bpmn/expected/${testcase}.txt`,
  //       "utf8", 
  //     ).replace(/\r/g, '');
  //     let sequence = new BpmnParser().parse(fileName);
  //     let result = sequence.toString(0);
  //     writeResult(fileName, sequence);
  //     expect(result).toBe(expected);
  //   });
  //   it("Normalize - Serial If branch", () => {
  //     let testcase = 8;
  //     let fileName = `__test__/bpmn/${testcase}.xml`;
  //     let expected = fs.readFileSync(
  //       `__test__/bpmn/expected/${testcase}.txt`,
  //       "utf8", 
  //     ).replace(/\r/g, '');
  //     let sequence = new BpmnParser().parse(fileName);
  //     let result = sequence.toString(0);
  //     writeResult(fileName, sequence);
  //     expect(result).toBe(expected);
  //   });
  // })

  // describe("Unormalize Join Node Test", () => {
  //   it("Not Normalize Form Split-Join", () => {
  //     let testcase = 5;
  //     let fileName = `__test__/bpmn/${testcase}.xml`;
  //     let expected = fs.readFileSync(
  //       `__test__/bpmn/expected/${testcase}.txt`,
  //       "utf8", 
  //     ).replace(/\r/g, '');
  //     let sequence = new BpmnParser().parse(fileName);
  //     let result = sequence.toString(0);
  //     writeResult(fileName, sequence);
  //     expect(result).toBe(expected);
  //   });
    
  //   it("Not Normalize Form Split-Join - 2", () => {
  //     let testcase = 7;
  //     let fileName = `__test__/bpmn/${testcase}.xml`;
  //     let expected = fs.readFileSync(
  //       `__test__/bpmn/expected/${testcase}.txt`,
  //       "utf8", 
  //     ).replace(/\r/g, '');
  //     let sequence = new BpmnParser().parse(fileName);
  //     let result = sequence.toString(0);
  //     writeResult(fileName, sequence);
  //     expect(result).toBe(expected);
  //   });
  
  // })

  // it("Nested Branching", () => {
  //   let testcase = 3;
  //   let fileName = `__test__/bpmn/${testcase}.xml`;
  //   let expected = fs.readFileSync(
  //     `__test__/bpmn/expected/${testcase}.txt`,
  //     "utf8", 
  //   ).replace(/\r/g, '');
  //   let sequence = new BpmnParser().parse(fileName);
  //   let result = sequence.toString(0);
  //   writeResult(fileName, sequence);
  //   expect(result).toBe(expected);
  // });

  // // it("Have Many Endpoint => Return", () => {})
  // it("Middle Break Or Return", () => {
  //   let t = () => new BpmnParser().parse("__test__/bpmn/6.xml");
  //   // expect(t).toThrow(TypeError)
  // });
});

function writeResult(fileName: string, sequence: Sequence) {
  fs.writeFile(
    `__test__/bpmn/results/${fileName.split('/').at(-1)?.split('.')[0]}.txt`,
    sequence.toString(0),
    'utf8',
    () => {}
  );
}
