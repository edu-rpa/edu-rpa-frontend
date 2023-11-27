import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import React, { useEffect, useImperativeHandle, useRef } from 'react';

type CustomDatePickerRef = {
  getDate: () => Date;
  setDate: (newDate: Date) => void;
};

const CustomDatePicker = React.forwardRef<
  CustomDatePickerRef,
  {
    paramKey: string;
    defaultValue: Date;
    handleInputChange: (paramKey: string, newDate: any) => void;
  }
>((props, ref) => {
  const dateRef = useRef(new Date());

  useEffect(() => {
    dateRef.current = props.defaultValue;
  }, []);

  useImperativeHandle(ref, () => ({
    getDate: () => dateRef.current,
    setDate: (newDate: Date) => {
      dateRef.current = newDate;
    },
  }));

  return (
    <SingleDatepicker
      name={props.paramKey}
      date={dateRef.current}
      onDateChange={(newDate) => {
        dateRef.current = newDate;
        props.handleInputChange(props.paramKey, newDate);
      }}
    />
  );
});
export default CustomDatePicker;
