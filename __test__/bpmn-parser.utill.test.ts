import { parseBPMNFile } from "@/utils/bpmn-parser/bpmn.util";

describe("BPMN Test", () => {
    it("Test", () => {
        parseBPMNFile("__test__/bpmn/2.xml")
    })
})