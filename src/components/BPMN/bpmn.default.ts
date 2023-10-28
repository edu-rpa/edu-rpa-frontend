export const defaultBpmnXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0jl7jys" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="14.0.0">
  <bpmn:process id="Process_04og7m0" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1mxxylx">
      <bpmn:outgoing>Flow_12ctyks</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_0pkjxtm" name="Open Browser">
      <bpmn:incoming>Flow_12ctyks</bpmn:incoming>
      <bpmn:outgoing>Flow_1ufgvsl</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_12ctyks" sourceRef="StartEvent_1mxxylx" targetRef="Activity_0pkjxtm" />
    <bpmn:task id="Activity_1536xo5" name="Get Title Assign to title">
      <bpmn:incoming>Flow_1ufgvsl</bpmn:incoming>
      <bpmn:outgoing>Flow_0c0pvmq</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1ufgvsl" sourceRef="Activity_0pkjxtm" targetRef="Activity_1536xo5" />
    <bpmn:exclusiveGateway id="Gateway_0sc92or">
      <bpmn:incoming>Flow_0c0pvmq</bpmn:incoming>
      <bpmn:outgoing>Flow_1u5v65y</bpmn:outgoing>
      <bpmn:outgoing>Flow_0q637w1</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0c0pvmq" sourceRef="Activity_1536xo5" targetRef="Gateway_0sc92or" />
    <bpmn:task id="Activity_1gusysf" name="Log Screen">
      <bpmn:incoming>Flow_1u5v65y</bpmn:incoming>
      <bpmn:outgoing>Flow_0acg68n</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1u5v65y" name="&#39;Element&#39; in title" sourceRef="Gateway_0sc92or" targetRef="Activity_1gusysf" />
    <bpmn:task id="Activity_0m9hqf4" name="Log Screen">
      <bpmn:incoming>Flow_0q637w1</bpmn:incoming>
      <bpmn:outgoing>Flow_0dumw2x</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0q637w1" name="else" sourceRef="Gateway_0sc92or" targetRef="Activity_0m9hqf4" />
    <bpmn:exclusiveGateway id="Gateway_1w9pebz">
      <bpmn:incoming>Flow_1r4gg47</bpmn:incoming>
      <bpmn:incoming>Flow_0d7t0oh</bpmn:incoming>
      <bpmn:outgoing>Flow_0acsgi9</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0acg68n" sourceRef="Activity_1gusysf" targetRef="Activity_173a9c7" />
    <bpmn:sequenceFlow id="Flow_0dumw2x" sourceRef="Activity_0m9hqf4" targetRef="Activity_0p2itoz" />
    <bpmn:task id="Activity_012ckfs" name="Close Browser">
      <bpmn:incoming>Flow_0acsgi9</bpmn:incoming>
      <bpmn:outgoing>Flow_0piu48d</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0acsgi9" sourceRef="Gateway_1w9pebz" targetRef="Activity_012ckfs" />
    <bpmn:endEvent id="Event_10jy91v">
      <bpmn:incoming>Flow_0piu48d</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0piu48d" sourceRef="Activity_012ckfs" targetRef="Event_10jy91v" />
    <bpmn:task id="Activity_173a9c7" name="Click &#34;Dịch vụ Internet&#34;">
      <bpmn:incoming>Flow_0acg68n</bpmn:incoming>
      <bpmn:outgoing>Flow_1r4gg47</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_1r4gg47" sourceRef="Activity_173a9c7" targetRef="Gateway_1w9pebz" />
    <bpmn:task id="Activity_0p2itoz" name="Click &#34;Thảo luận&#34;">
      <bpmn:incoming>Flow_0dumw2x</bpmn:incoming>
      <bpmn:outgoing>Flow_0d7t0oh</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_0d7t0oh" sourceRef="Activity_0p2itoz" targetRef="Gateway_1w9pebz" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_04og7m0">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1mxxylx">
        <dc:Bounds x="152" y="162" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0pkjxtm_di" bpmnElement="Activity_0pkjxtm">
        <dc:Bounds x="280" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1536xo5_di" bpmnElement="Activity_1536xo5">
        <dc:Bounds x="470" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0sc92or_di" bpmnElement="Gateway_0sc92or" isMarkerVisible="true">
        <dc:Bounds x="675" y="155" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0bnioio" bpmnElement="Gateway_1w9pebz" isMarkerVisible="true">
        <dc:Bounds x="1045" y="155" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0eltz4d" bpmnElement="Activity_012ckfs">
        <dc:Bounds x="1210" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_10jy91v_di" bpmnElement="Event_10jy91v">
        <dc:Bounds x="1402" y="162" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1exvj2h" bpmnElement="Activity_0m9hqf4">
        <dc:Bounds x="760" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_0mbxrw9" bpmnElement="Activity_1gusysf">
        <dc:Bounds x="750" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_1d9ztt6" bpmnElement="Activity_173a9c7">
        <dc:Bounds x="920" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_06rx3y5" bpmnElement="Activity_0p2itoz">
        <dc:Bounds x="920" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_12ctyks_di" bpmnElement="Flow_12ctyks">
        <di:waypoint x="188" y="180" />
        <di:waypoint x="280" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ufgvsl_di" bpmnElement="Flow_1ufgvsl">
        <di:waypoint x="380" y="180" />
        <di:waypoint x="470" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0c0pvmq_di" bpmnElement="Flow_0c0pvmq">
        <di:waypoint x="570" y="180" />
        <di:waypoint x="675" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1u5v65y_di" bpmnElement="Flow_1u5v65y">
        <di:waypoint x="700" y="155" />
        <di:waypoint x="700" y="120" />
        <di:waypoint x="750" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="684" y="86" width="57" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0q637w1_di" bpmnElement="Flow_0q637w1">
        <di:waypoint x="700" y="205" />
        <di:waypoint x="700" y="250" />
        <di:waypoint x="760" y="250" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="705" y="225" width="21" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0acg68n_di" bpmnElement="Flow_0acg68n">
        <di:waypoint x="850" y="120" />
        <di:waypoint x="920" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0dumw2x_di" bpmnElement="Flow_0dumw2x">
        <di:waypoint x="860" y="250" />
        <di:waypoint x="920" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0acsgi9_di" bpmnElement="Flow_0acsgi9">
        <di:waypoint x="1095" y="180" />
        <di:waypoint x="1210" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0piu48d_di" bpmnElement="Flow_0piu48d">
        <di:waypoint x="1310" y="180" />
        <di:waypoint x="1402" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1r4gg47_di" bpmnElement="Flow_1r4gg47">
        <di:waypoint x="1020" y="120" />
        <di:waypoint x="1070" y="120" />
        <di:waypoint x="1070" y="155" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0d7t0oh_di" bpmnElement="Flow_0d7t0oh">
        <di:waypoint x="1020" y="250" />
        <di:waypoint x="1070" y="250" />
        <di:waypoint x="1070" y="205" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
