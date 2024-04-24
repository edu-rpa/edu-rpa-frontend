import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Input,
  Select,
  RadioGroup,
  Radio,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import TextAutoComplete from '@/components/Input/AutoComplete/TextAutoComplete';

interface Condition {
  id: string;
  left: string;
  operator: string;
  right: string;
  logicalOperator: string;
}

const Condition = ({ id, data, recommendWords, onDelete, onChange }) => {
  const handleLeftChange = (value) => {
    onChange(id, { ...data, left: value });
  };

  const handleOperatorChange = (e) => {
    onChange(id, { ...data, operator: e.target.value });
  };

  const handleRightChange = (value) => {
    onChange(id, { ...data, right: value });
  };

  return (
    <Box>
      <TextAutoComplete
        type="text"
        value={data.left}
        onChange={(newValue: string) => handleLeftChange(newValue)}
        recommendedWords={recommendWords}
      />
      <Select
        placeholder="Select Operator"
        onChange={handleOperatorChange}
        value={data.operator}
        className="my-[10px]">
        <option value="=">{'='}</option>
        <option value="!=">{'!='}</option>
        <option value="<">{'<'}</option>
        <option value="<=">{'<='}</option>
        <option value=">">{'>'}</option>
        <option value=">=">{'>='}</option>
      </Select>
      <TextAutoComplete
        type="text"
        value={data.right}
        onChange={(newValue: string) => handleRightChange(newValue)}
        recommendedWords={recommendWords}
      />
      <Box className="flex justify-between items-center">
        <Box></Box>
        <IconButton
          aria-label="Delete condition"
          bgColor={'red.500'}
          className="mt-[10px]"
          _hover={{ bgColor: 'red.600' }}
          icon={<CloseIcon color={'white'} />}
          onClick={() => onDelete(id)}
        />
      </Box>
    </Box>
  );
};

interface ConditionListProps {
  recommendedWords: string[];
  value: string;
  onChange: (newValue: string) => void;
}

const ConditionList = ({
  recommendedWords,
  value,
  onChange,
}: ConditionListProps) => {
  const addCondition = () => {
    const newCondition = {
      id: Math.random().toString(),
      left: '',
      operator: '',
      right: '',
      logicalOperator: '',
    };
    setConditions([...conditions, newCondition]);
  };

  const parseExpression = (expression) => {
    const conditionRegex =
      /(&\{[^}]+\}|[^\s<>=!]+)\s*(==|!=|<=|>=|<|>)\s*(&\{[^}]+\}|[^\s<>=!]+)(?:\s*(\&\&|\|\|))?/g;
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
        left: match[1] ?? '',
        operator: match[2] ?? '',
        right: match[3] ?? '',
        logicalOperator: match[4] ?? '',
      });

      lastIndex = conditionRegex.lastIndex;
    }

    return parsedConditions;
  };

  const [conditions, setConditions] = useState<any[]>([]);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);

  const deleteCondition = (id) => {
    setConditions(conditions.filter((condition) => condition.id !== id));
  };

  const handleConditionChange = (id, updatedCondition) => {
    const newConditions = conditions.map((condition) =>
      condition.id === id ? updatedCondition : condition
    );
    setConditions([...newConditions]);
    handleUpdateExpression();
  };

  const handleLogicalOperatorChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index].logicalOperator = value;
    setConditions([...newConditions]);
    handleUpdateExpression();
  };

  const handleUpdateExpression = () => {
    const expression = conditions
      .map((cond, index) => {
        const part = `${cond.left} ${cond.operator} ${cond.right}`;
        return index === 0
          ? part
          : `${conditions[index - 1].logicalOperator} ${part}`;
      })
      .join(' ');
    if (onChange) {
      onChange(expression);
    }
  };

  useEffect(() => {
    if (isFirstVisit) {
      setConditions(parseExpression(value));
      setIsFirstVisit(true);
    }
  }, [value]);

  return (
    <Box>
      {conditions &&
        conditions.map((condition, index) => (
          <Box key={condition.id}>
            <Condition
              id={condition.id}
              data={condition}
              onDelete={deleteCondition}
              onChange={handleConditionChange}
              recommendWords={recommendedWords}
            />
            {index < conditions.length - 1 && (
              <RadioGroup
                onChange={(e) => handleLogicalOperatorChange(index, e)}
                value={condition.logicalOperator}
                defaultValue="&&"
                className="my-[10px]"
                marginLeft="2">
                <HStack justifyContent="flex-start">
                  <Radio value="&&">AND</Radio>
                  <Radio value="||">OR</Radio>
                </HStack>
              </RadioGroup>
            )}
          </Box>
        ))}
      <Button onClick={addCondition} colorScheme="blue" marginTop="4">
        Add Condition
      </Button>
    </Box>
  );
};

export default ConditionList;
