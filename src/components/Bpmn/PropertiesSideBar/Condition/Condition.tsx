import TextAutoComplete from '@/components/Input/AutoComplete/TextAutoComplete';
import { isSavedChange } from '@/redux/slice/bpmnSlice';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  Select,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

export interface ConditionData {
  id: string;
  left: string;
  operator: string;
  right: string;
  logicalOperator: string;
}

interface ConditionProps {
  id: string;
  index: number;
  data: ConditionData;
  recommendWords: string[];
  onDelete: (id: string) => void;
  onChange: (id: string, updatedData: any) => void;
}

const Condition = ({
  id,
  data,
  index,
  recommendWords,
  onDelete,
  onChange,
}: ConditionProps) => {
  const handleValueChange = (field: string) => (value: string) => {
    onChange(id, { ...data, [field]: value });
  };

  const dispatch = useDispatch();

  return (
    <Box>
      {index > 0 && (
        <RadioGroup
          className="my-[10px]"
          onChange={(e) => {
            handleValueChange('logicalOperator')(e);
            dispatch(isSavedChange(false));
          }}
          value={data.logicalOperator}>
          <HStack spacing={4}>
            <Radio value="&&">AND</Radio>
            <Radio value="||">OR</Radio>
          </HStack>
        </RadioGroup>
      )}

      <Box className="my-[10px]">
        <TextAutoComplete
          type="text"
          value={data.left}
          onChange={handleValueChange('left')}
          recommendedWords={recommendWords}
        />
        <Select
          className="my-[10px]"
          value={data.operator}
          onChange={(e) => handleValueChange('operator')(e.target.value)}>
          {['Select Operator', '=', '!=', '<', '<=', '>', '>='].map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </Select>
        <TextAutoComplete
          type="text"
          value={data.right}
          onChange={handleValueChange('right')}
          recommendedWords={recommendWords}
        />
      </Box>

      {index > 0 && (
        <Box className="flex justify-between items-center">
          <Box></Box>
          <IconButton
            aria-label="Delete condition"
            icon={<CloseIcon />}
            colorScheme="red"
            onClick={() => {
              onDelete(id);
              dispatch(isSavedChange(false));
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Condition;
