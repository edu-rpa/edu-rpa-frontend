import {
  BpmnJsReactHandle,
  BpmnJsReactProps,
} from '@/interfaces/bpmnJsReact.interface';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import BpmnJsModeler from './BpmnJsModeler';

const BpmnJsReact: ForwardRefRenderFunction<
  BpmnJsReactHandle,
  BpmnJsReactProps
> = ({ mode = 'view', xml, useBpmnJsReact, ...props }, ref) => {
  return (
    <BpmnJsModeler
      {...props}
      xml={xml}
      ref={ref}
      useBpmnJsReact={useBpmnJsReact}
    />
  );
};
export default forwardRef(BpmnJsReact);
