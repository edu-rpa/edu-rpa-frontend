import { Bpmn2RbtParser } from "@/utils/bpmn-parser/bpmn-2-rbt-parser.utils"
import { BpmnParser } from "@/utils/bpmn-parser/bpmn-parser.util"
import { BpmnParseError } from "@/utils/bpmn-parser/error"


describe("BPMN Test", () => {
    it("Test", () => {
        expect(() => new BpmnParser().parse("__test__/bpmn/1.xml")).toThrow(BpmnParseError)
    })

    it("Test", () => {
        let process = new BpmnParser().parse("__test__/bpmn/2.xml")
        console.log(process)
    })

})