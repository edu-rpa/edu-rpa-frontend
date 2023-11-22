import PaletteProvider from 'bpmn-js/lib/features/palette/PaletteProvider';

/**
 * @description Removes unsupported BPMN artifacts from the modeler
 * @category Frontend
 */
const removeUnsupportedBpmnFunctions = () => {
  const { getPaletteEntries } = PaletteProvider.prototype;
  PaletteProvider.prototype.getPaletteEntries = function () {
    const entries = getPaletteEntries.apply(this);
    delete entries['create.intermediate-event'];
    delete entries['create.participant-expanded'];
    delete entries['create.group'];
    delete entries['create.data-store'];
    delete entries['create.data-object'];
    return entries;
  };

  class CustomContextPadProvider {
    constructor(contextPad: any) {
      contextPad.registerProvider(this);
    }

    getContextPadEntries() {
      return function (entries: any) {
        const customizesEntries = entries;
        delete customizesEntries['append.text-annotation'];
        delete customizesEntries['append.gateway'];
        delete customizesEntries['append.intermediate-event'];
        delete customizesEntries['lane-insert-above'];
        delete customizesEntries['lane-divide-two'];
        delete customizesEntries['lane-divide-three'];
        delete customizesEntries['lane-insert-below'];
        delete customizesEntries.replace;
        return customizesEntries;
      };
    }
  }

  return CustomContextPadProvider;
};

export default removeUnsupportedBpmnFunctions;
