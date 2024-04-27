import { useState } from 'react';
import { ConditionData } from './Condition';

export const useConditions = (initialExpression: string) => {
  const parseExpression = (expression: string) => {
    const conditionRegex =
      /(?:\s*(\&\&|\|\|))?(&\{[^}]+\}|[^\s<>=!]+)\s*(=|!=|<=|>=|<|>)\s*(&\{[^}]+\}|[^\s<>=!]+)/g;
    let match;
    const parsedConditions = [];
    let lastIndex = 0;

    while ((match = conditionRegex.exec(expression)) !== null) {
      let { index } = match;
      let logicalOperator = '';
      if (lastIndex !== 0 && lastIndex !== index) {
        logicalOperator = expression.slice(lastIndex, index).trim();
      }

      parsedConditions.push({
        id: Math.random().toString(),
        left: match[2] ?? '',
        operator: match[3] ?? '',
        right: match[4] ?? '',
        logicalOperator: (logicalOperator || match[1]) ?? '',
      });

      lastIndex = conditionRegex.lastIndex;
    }

    return parsedConditions;
  };

  const formatExpression = (conditions: ConditionData[]) => {
    return conditions
      .map((cond, index) => {
        const part = `${cond.left} ${cond.operator} ${cond.right}`;
        if (index > 0) {
          const logicalOperator = conditions[index].logicalOperator;
          return `${logicalOperator} ${part}`;
        }
        return part;
      })
      .join(' ');
  };

  const [conditions, setConditions] = useState(() =>
    parseExpression(initialExpression)
  );

  const addCondition = () => {
    const newCondition = {
      id: Math.random().toString(),
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
    formatExpression,
    addCondition,
    deleteCondition,
    updateCondition,
  };
};
