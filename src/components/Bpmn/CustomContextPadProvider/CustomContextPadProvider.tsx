import removeUnsupportedBpmnFunctions from '../removeTrackPad';

export default {
  __init__: ['CustomContextPadProvider'],
  CustomContextPadProvider: ['type', removeUnsupportedBpmnFunctions()],
};
