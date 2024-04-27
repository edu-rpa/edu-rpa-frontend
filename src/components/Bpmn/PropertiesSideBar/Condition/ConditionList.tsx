import { useConditions } from '@/components/Bpmn/PropertiesSideBar/Condition/useCondition';
import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Condition from './Condition';

interface ConditionListProps {
  recommendedWords: string[];
  expression: string;
  onExpressionChange: (expression: string) => void;
}
const ConditionList = ({
  recommendedWords,
  expression,
  onExpressionChange,
}: ConditionListProps) => {
  const {
    conditions,
    addCondition,
    deleteCondition,
    updateCondition,
    formatExpression,
  } = useConditions(expression);

  useEffect(() => {
    const formattedExpression = formatExpression(conditions);
    onExpressionChange(formattedExpression);
  }, [conditions]);

  return (
    <Box>
      {conditions.map((condition, index) => (
        <Condition
          key={condition.id}
          id={condition.id}
          data={condition}
          index={index}
          onDelete={deleteCondition}
          onChange={updateCondition}
          recommendWords={recommendedWords}
        />
      ))}
      <Button onClick={addCondition} colorScheme="blue">
        Add Condition
      </Button>
    </Box>
  );
};

export default ConditionList;
