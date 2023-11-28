import { BpmnParser } from "@/utils/bpmn-parser/bpmn-parser.util";
var fs = require("fs");

const root = "__test__/bpmn/bpmnProperty"
describe("BPMN Parser Test", () => {
    it("Test Normal Case", () => {
      let testcase = 1;
      let bpmnFileName = `${root}/${testcase}.xml`;
      let propertiesFileName = `${root}/${testcase}.json`;
      let xml = fs.readFileSync(bpmnFileName, 'utf8');
      let properties = JSON.parse(fs.readFileSync(propertiesFileName, 'utf8'));

      let robot = new BpmnParser().parse(xml, properties["activities"]);
      writeResult(bpmnFileName, robot);
    });
    it("Test Branch", () => {
      let testcase = 2;
      let bpmnFileName = `${root}/${testcase}.xml`;
      let propertiesFileName = `${root}/${testcase}.json`;
      let xml = fs.readFileSync(bpmnFileName, 'utf8');
      let properties = JSON.parse(fs.readFileSync(propertiesFileName, 'utf8'));

      let robot = new BpmnParser().parse(xml, properties["activities"]);
      writeResult(bpmnFileName, robot);
    });
    it("Test Loop", () => {
      let testcase = 3;
      let bpmnFileName = `${root}/${testcase}.xml`;
      let propertiesFileName = `${root}/${testcase}.json`;
      let xml = fs.readFileSync(bpmnFileName, 'utf8');
      let properties = JSON.parse(fs.readFileSync(propertiesFileName, 'utf8'));

      let robot = new BpmnParser().parse(xml, properties["activities"]);
      writeResult(bpmnFileName, robot);
    });
});

function writeResult(fileName: string, robot: any) {
  fs.writeFile(
    `${root}/results/${fileName.split('/').at(-1)?.split('.')[0]}.json`,
    JSON.stringify(robot, null, 2),
    'utf8',
    () => {}
  );
}
