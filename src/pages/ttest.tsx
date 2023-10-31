import React from 'react';
import dynamic from 'next/dynamic';
import DrawerExample from '@/components/PropertiesSideBar/PropertiesSideBar';

const DynamicCustomModeler = dynamic(
  () => import('@/components/Bpmn/CustomModeler'),
  { ssr: false }
);

export default function Test() {
  return (
    <div>
      <DynamicCustomModeler />
    </div>
  );
}
