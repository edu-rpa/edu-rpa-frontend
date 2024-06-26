export enum BpmnElementType {
  Group = 'bpmn:Group',
  Process = 'bpmn:Process',
  SubProcess = 'bpmn:SubProcess',
  StartEvent = 'bpmn:StartEvent',
  EndEvent = 'bpmn:EndEvent',
  UserTask = 'bpmn:UserTask',
  ServiceTask = 'bpmn:ServiceTask',
  ScriptTask = 'bpmn:ScriptTask',
  SendTask = 'bpmn:SendTask',
  ReceiveTask = 'bpmn:ReceiveTask',
  ManualTask = 'bpmn:ManualTask',
  BusinessRuleTask = 'bpmn:BusinessRuleTask',
  ExclusiveGateway = 'bpmn:ExclusiveGateway',
  ParallelGateway = 'bpmn:ParallelGateway',
  InclusiveGateway = 'bpmn:InclusiveGateway',
  ComplexGateway = 'bpmn:ComplexGateway',
  EventBasedGateway = 'bpmn:EventBasedGateway',
  SequenceFlow = 'bpmn:SequenceFlow',
  MessageFlow = 'bpmn:MessageFlow',
  Association = 'bpmn:Association',
  DataAssociation = 'bpmn:DataAssociation',
  DataInputAssociation = 'bpmn:DataInputAssociation',
  DataOutputAssociation = 'bpmn:DataOutputAssociation',
  DataStoreReference = 'bpmn:DataStoreReference',
  DataObjectReference = 'bpmn:DataObjectReference',
  DataInput = 'bpmn:DataInput',
  DataOutput = 'bpmn:DataOutput',
  DataState = 'bpmn:DataState',
  DataObject = 'bpmn:DataObject',
  DataStore = 'bpmn:DataStore',
  Message = 'bpmn:Message',
  MessageFlowAssociation = 'bpmn:MessageFlowAssociation',
  ConversationLink = 'bpmn:ConversationLink',
  Conversation = 'bpmn:Conversation',
  ConversationAssociation = 'bpmn:ConversationAssociation',
  ConversationNode = 'bpmn:ConversationNode',
  ConversationParticipant = 'bpmn:ConversationParticipant',
}
