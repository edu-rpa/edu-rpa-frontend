import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Input,
  Select,
  RadioGroup,
  Radio,
  HStack,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

// Condition component now has `data` and `onChange` props
const Condition = ({ id, data, onDelete, onChange }) => {
  const handleLeftChange = (e) => {
    onChange(id, { ...data, left: e.target.value });
  };

  const handleOperatorChange = (e) => {
    onChange(id, { ...data, operator: e.target.value });
  };

  const handleRightChange = (e) => {
    onChange(id, { ...data, right: e.target.value });
  };

  return (
    <HStack marginBottom="4">
      <Input
        placeholder="Type or select variables"
        value={data.left}
        onChange={handleLeftChange}
      />
      <Select
        placeholder="Choose operator"
        value={data.operator}
        onChange={handleOperatorChange}>
        <option value="=">{'='}</option>
        <option value="!=">{'!='}</option>
        <option value="<">{'<'}</option>
        <option value="<=">{'<='}</option>
        <option value=">">{'>'}</option>
        <option value=">=">{'>='}</option>
      </Select>
      <Input
        placeholder="Type or select variables"
        value={data.right}
        onChange={handleRightChange}
      />
      <IconButton
        aria-label="Delete condition"
        bgColor={'red.500'}
        _hover={{ bgColor: 'red.600' }}
        icon={<CloseIcon color={'white'} />}
        onClick={() => onDelete(id)}
      />
    </HStack>
  );
};

const ConditionList = () => {
  const [conditions, setConditions] = useState([
    { id: 'init', left: '', operator: '=', right: '', logicalOperator: 'AND' },
  ]);

  const addCondition = () => {
    const newCondition = {
      id: Math.random().toString(),
      left: '',
      operator: '=',
      right: '',
      logicalOperator: 'AND',
    };
    setConditions([...conditions, newCondition]);
  };

  const deleteCondition = (id) => {
    setConditions(conditions.filter((condition) => condition.id !== id));
  };

  const handleConditionChange = (id, updatedCondition) => {
    setConditions(
      conditions.map((condition) =>
        condition.id === id ? updatedCondition : condition
      )
    );
  };

  const handleLogicalOperatorChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index].logicalOperator = value;
    setConditions(newConditions);
  };

  // Function to build the expression
  const getExpression = () => {
    return conditions
      .map((cond) => `${cond.left} ${cond.operator} ${cond.right}`)
      .join(` ${conditions[0].logicalOperator} `);
  };

  // Side effect to log the expression when conditions change
  useEffect(() => {
    console.log(getExpression());
  }, [conditions]);

  return (
    <Box>
      {conditions.map((condition, index) => (
        <Box key={condition.id}>
          <Condition
            id={condition.id}
            data={condition}
            onDelete={deleteCondition}
            onChange={handleConditionChange}
          />
          {index < conditions.length - 1 && (
            <RadioGroup
              onChange={(e) => handleLogicalOperatorChange(index, e)}
              value={condition.logicalOperator}
              defaultValue="AND"
              className="my-[10px]"
              marginLeft="2">
              <HStack justifyContent="flex-start">
                <Radio value="AND">AND</Radio>
                <Radio value="OR">OR</Radio>
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
