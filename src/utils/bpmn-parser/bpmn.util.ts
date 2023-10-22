import { BPMNElement, Bpmn, Convert } from ".";

var convert = require("xml-js");
var fs = require("fs");
var options = { ignoreComment: true, alwaysChildren: true };

export function parseBPMNFile(fileName: string) {
  let xml = fs.readFileSync(fileName, "utf8");
  let result = convert.xml2js(xml, options);
  let bpmn:Bpmn = Convert.toBpmn(JSON.stringify(result));
}