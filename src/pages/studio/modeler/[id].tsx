import React from 'react';
import dynamic from 'next/dynamic';
const DynamicCustomModeler = dynamic(
  () => import('@/components/Bpmn/CustomModeler'),
  { ssr: false }
);

export default function Modeler() {
  return (
    <div>
      <DynamicCustomModeler />
    </div>
  );
}
