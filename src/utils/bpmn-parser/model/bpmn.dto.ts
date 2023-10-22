// To parse this data:
//
//   import { Convert, Bpmn } from "./file";
//
//   const bpmn = Convert.toBpmn(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export type Bpmn = {
    declaration: Declaration;
    elements:    BPMNElement[];
}

export type Declaration = {
    attributes: DeclarationAttributes;
}

export type DeclarationAttributes = {
    version:  string;
    encoding: string;
}

export type BPMNElement = {
    type:       Type;
    name:       string;
    attributes: PurpleAttributes;
    elements:   PurpleElement[];
}

export type PurpleAttributes = {
    xmlns:           string;
    "xmlns:bpmndi":  string;
    "xmlns:omgdi":   string;
    "xmlns:omgdc":   string;
    "xmlns:xsi":     string;
    id:              string;
    targetNamespace: string;
    exporter:        string;
    exporterVersion: string;
}

export type PurpleElement = {
    type:       Type;
    name:       string;
    attributes: FluffyAttributes;
    elements:   FluffyElement[];
}

export type FluffyAttributes = {
    id:            string;
    isExecutable?: string;
}

export type FluffyElement = {
    type:       Type;
    name:       string;
    attributes: BpmnComponentAttributes;
    elements:   BpmnComponentElement[];
}

export type BpmnComponentAttributes = {
    id:           string;
    processRef?:  string;
    name?:        string;
    sourceRef?:   string;
    targetRef?:   string;
    bpmnElement?: string;
}

export type BpmnComponentElement = {
    type:        Type;
    name:        string;
    elements:    BpmnShapeElement[];
    attributes?: BpmnShapeAttributes;
}

export type BpmnShapeAttributes = {
    id:               string;
    sourceRef?:       string;
    targetRef?:       string;
    bpmnElement?:     string;
    isHorizontal?:    string;
    isMarkerVisible?: string;
    isExpanded?:      string;
}

export type BpmnShapeElement = {
    type:        Type;
    text?:       string;
    name?:       Name;
    elements?:   BpmnShapeElement[];
    attributes?: IndigoAttributes;
}

export type IndigoAttributes = {
    id?:     string;
    x?:      string;
    y?:      string;
    width?:  string;
    height?: string;
}

export enum Name {
    BpmndiBPMNLabel = "bpmndi:BPMNLabel",
    Incoming = "incoming",
    OmgdcBounds = "omgdc:Bounds",
    OmgdiWaypoint = "omgdi:waypoint",
    Outgoing = "outgoing",
    StartEvent = "startEvent",
}

export enum Type {
    Element = "element",
    Text = "text",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toBpmn(json: string): Bpmn {
        return cast(JSON.parse(json), r("Bpmn"));
    }

    public static bpmnToJson(value: Bpmn): string {
        return JSON.stringify(uncast(value, r("Bpmn")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Bpmn": o([
        { json: "declaration", js: "declaration", typ: r("Declaration") },
        { json: "elements", js: "elements", typ: a(r("BPMNElement")) },
    ], false),
    "Declaration": o([
        { json: "attributes", js: "attributes", typ: r("DeclarationAttributes") },
    ], false),
    "DeclarationAttributes": o([
        { json: "version", js: "version", typ: "" },
        { json: "encoding", js: "encoding", typ: "" },
    ], false),
    "BPMNElement": o([
        { json: "type", js: "type", typ: r("Type") },
        { json: "name", js: "name", typ: "" },
        { json: "attributes", js: "attributes", typ: r("PurpleAttributes") },
        { json: "elements", js: "elements", typ: a(r("PurpleElement")) },
    ], false),
    "PurpleAttributes": o([
        { json: "xmlns", js: "xmlns", typ: "" },
        { json: "xmlns:bpmndi", js: "xmlns:bpmndi", typ: "" },
        { json: "xmlns:omgdi", js: "xmlns:omgdi", typ: "" },
        { json: "xmlns:omgdc", js: "xmlns:omgdc", typ: "" },
        { json: "xmlns:xsi", js: "xmlns:xsi", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "targetNamespace", js: "targetNamespace", typ: "" },
        { json: "exporter", js: "exporter", typ: "" },
        { json: "exporterVersion", js: "exporterVersion", typ: "" },
    ], false),
    "PurpleElement": o([
        { json: "type", js: "type", typ: r("Type") },
        { json: "name", js: "name", typ: "" },
        { json: "attributes", js: "attributes", typ: r("FluffyAttributes") },
        { json: "elements", js: "elements", typ: a(r("FluffyElement")) },
    ], false),
    "FluffyAttributes": o([
        { json: "id", js: "id", typ: "" },
        { json: "isExecutable", js: "isExecutable", typ: u(undefined, "") },
    ], false),
    "FluffyElement": o([
        { json: "type", js: "type", typ: r("Type") },
        { json: "name", js: "name", typ: "" },
        { json: "attributes", js: "attributes", typ: r("BpmnComponentAttributes") },
        { json: "elements", js: "elements", typ: a(r("BpmnComponentElement")) },
    ], false),
    "BpmnComponentAttributes": o([
        { json: "id", js: "id", typ: "" },
        { json: "processRef", js: "processRef", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "sourceRef", js: "sourceRef", typ: u(undefined, "") },
        { json: "targetRef", js: "targetRef", typ: u(undefined, "") },
        { json: "bpmnElement", js: "bpmnElement", typ: u(undefined, "") },
    ], false),
    "BpmnComponentElement": o([
        { json: "type", js: "type", typ: r("Type") },
        { json: "name", js: "name", typ: "" },
        { json: "elements", js: "elements", typ: a(r("BpmnShapeElement")) },
        { json: "attributes", js: "attributes", typ: u(undefined, r("BpmnShapeAttributes")) },
    ], false),
    "BpmnShapeAttributes": o([
        { json: "id", js: "id", typ: "" },
        { json: "sourceRef", js: "sourceRef", typ: u(undefined, "") },
        { json: "targetRef", js: "targetRef", typ: u(undefined, "") },
        { json: "bpmnElement", js: "bpmnElement", typ: u(undefined, "") },
        { json: "isHorizontal", js: "isHorizontal", typ: u(undefined, "") },
        { json: "isMarkerVisible", js: "isMarkerVisible", typ: u(undefined, "") },
        { json: "isExpanded", js: "isExpanded", typ: u(undefined, "") },
    ], false),
    "BpmnShapeElement": o([
        { json: "type", js: "type", typ: r("Type") },
        { json: "text", js: "text", typ: u(undefined, "") },
        { json: "name", js: "name", typ: u(undefined, r("Name")) },
        { json: "elements", js: "elements", typ: u(undefined, a(r("BpmnShapeElement"))) },
        { json: "attributes", js: "attributes", typ: u(undefined, r("IndigoAttributes")) },
    ], false),
    "IndigoAttributes": o([
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "x", js: "x", typ: u(undefined, "") },
        { json: "y", js: "y", typ: u(undefined, "") },
        { json: "width", js: "width", typ: u(undefined, "") },
        { json: "height", js: "height", typ: u(undefined, "") },
    ], false),
    "Name": [
        "bpmndi:BPMNLabel",
        "incoming",
        "omgdc:Bounds",
        "omgdi:waypoint",
        "outgoing",
        "startEvent",
    ],
    "Type": [
        "element",
        "text",
    ],
};
