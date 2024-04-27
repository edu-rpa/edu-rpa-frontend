import { useState } from 'react';
import { ConditionData } from './Condition';
import { v4 as uuidv4 } from 'uuid';

export const useConditions = (condtionData: ConditionData[]) => {
  const [conditions, setConditions] = useState(condtionData);

  const addCondition = () => {
    const newCondition = {
      id: uuidv4(),
      left: '',
      operator: '',
      right: '',
      logicalOperator: '&&',
    };
    setConditions([...conditions, newCondition]);
  };

  const deleteCondition = (id: string) => {
    if (conditions.length == 0) return;
    setConditions(conditions.filter((condition) => condition.id !== id));
  };

  const updateCondition = (id: string, updatedData: any) => {
    const updatedConditions = conditions.map((condition) =>
      condition.id === id ? { ...condition, ...updatedData } : condition
    );
    setConditions(updatedConditions);
  };

  return {
    conditions,
    addCondition,
    deleteCondition,
    updateCondition,
  };
};
