import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Select,
  Switch,
} from '@chakra-ui/react';
import { Variable, VariableType } from '@/types/variable';
import { useDispatch } from 'react-redux';
import { isSavedChange } from '@/redux/slice/bpmnSlice';
import { v4 as uuidv4 } from 'uuid';

interface VariableTableProps {
  variableList: Variable[];
  setVariableList: (value: Variable[]) => void;
}

const DynamicVariableTable = (props: VariableTableProps) => {
  const dispatch = useDispatch();

  const defaultValue = {
    [VariableType.String]: '',
    [VariableType.Number]: '0',
    [VariableType.Boolean]: 'false',
    [VariableType.File]: '',
    [VariableType.List]: '[]',
    [VariableType.Dictionary]: '{}',
    [VariableType.Connection]: '',
  };

  const [selectedType, setSelectedType] = useState<VariableType>(
    VariableType.String
  );

  const handleAddRow = () => {
    const defaultTypeValue = defaultValue[selectedType] ?? '';
    const newRow: Variable = {
      id: uuidv4(),
      name: '',
      value: defaultTypeValue,
      isArgument: false,
      type: selectedType,
    };
    props.setVariableList([...props.variableList, newRow]);
    dispatch(isSavedChange(false));
  };

  const handleEditRow = (
    index: number,
    field: 'name' | 'value' | 'type' | 'isArgument',
    value: string | boolean
  ) => {
    const updatedData = [...props.variableList];

    if (field === 'isArgument') {
      updatedData[index][field] = value as boolean;
    } else {
      updatedData[index][field] = value as string;
    }

    props.setVariableList(updatedData);
  };

  const handleRemoveRow = (id: string) => {
    const updatedData = props.variableList.filter((row) => row.id !== id);
    props.setVariableList(updatedData);
  };

  const handleTypeChange = (index: number, newType: VariableType) => {
    setSelectedType(newType);
    const updatedData = [...props.variableList];
    const defaultTypeValue = defaultValue[newType] ?? '';
    updatedData[index].type = newType;
    updatedData[index].value = defaultTypeValue;
    props.setVariableList(updatedData);
  };

  return (
    <div>
      <Button colorScheme="teal" onClick={handleAddRow} mb={4}>
        Add Variable
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Value</Th>
            <Th>Type</Th>
            <Th>Is Argument</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.variableList.map((row, index) => (
            <Tr key={row.id}>
              <Td>{row.id}</Td>
              <Td>
                <Input
                  value={row.name}
                  onChange={(e) => {
                    handleEditRow(index, 'name', e.target.value);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={row.value}
                  onChange={(e) => {
                    handleEditRow(index, 'value', e.target.value);
                  }}
                />
              </Td>
              <Td>
                <Select
                  value={row.type}
                  onChange={(e) => {
                    handleTypeChange(index, e.target.value as VariableType);
                  }}>
                  <option value={VariableType.String}>String</option>
                  <option value={VariableType.Number}>Number</option>
                  <option value={VariableType.Boolean}>Boolean</option>
                  <option value={VariableType.File}>File</option>
                  <option value={VariableType.List}>List</option>
                  <option value={VariableType.Dictionary}>Dictionary</option>
                  <option value={VariableType.Connection}>Connection</option>
                </Select>
              </Td>
              <Td>
                <Switch
                  colorScheme="teal"
                  isChecked={row.isArgument}
                  onChange={(e) => {
                    handleEditRow(index, 'isArgument', e.target.checked);
                  }}
                />
              </Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveRow(row.id)}>
                  Remove
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default DynamicVariableTable;
