import { useConditions } from '@/components/Bpmn/PropertiesSideBar/Condition/useCondition';
import { Box, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import Condition from './Condition';
import { v4 as uuidv4 } from 'uuid';
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
  const defaultCondition = {
    id: uuidv4(),
    left: '',
    operator: '',
    right: '',
    logicalOperator: '',
  };

  const parseObject = expression ? JSON.parse(expression) : [defaultCondition];

  const { conditions, addCondition, deleteCondition, updateCondition } =
    useConditions(parseObject);

  useEffect(() => {
    onExpressionChange(JSON.stringify(conditions));
  }, [conditions]);

  return (
    <Box>
      {conditions?.map((condition, index) => (
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
