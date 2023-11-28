import BadgeAutoComplete from '@/components/AutoComplete/BadgeAutoComplete';
import TextAutoComplete from '@/components/AutoComplete/TextAutoComplete';
import React from 'react';

export default function Test() {
  return (
    <div className="mt-[150px]">
      <div className="w-30 m-auto">
        <TextAutoComplete />
        <BadgeAutoComplete />
      </div>
    </div>
  );
}
