import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import React, { useState } from 'react';

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  return (
    <SingleDatepicker name="date-input" date={date} onDateChange={setDate} />
  );
}
