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
import DynamicInputValue from './DynamicInputValue';

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
    [VariableType.DocumentTemplate]: '{}',
  };

  const [selectedType, setSelectedType] = useState<VariableType>(
    VariableType.String
  );

  const handleAddRow = () => {
    const defaultTypeValue = defaultValue[VariableType.String] ?? '';
    const newRow: Variable = {
      id: props.variableList.length + 1,
      name: '',
      value: defaultTypeValue,
      isArgument: false,
      type: VariableType.String,
    };

    props.setVariableList([...props.variableList, newRow]);
    dispatch(isSavedChange(false));
  };

  const handleEditRow = (
    index: number,
    field: 'name' | 'value' | 'type' | 'isArgument' | 'label',
    value: string | boolean
  ) => {
    const updatedData = [...props.variableList];
    if (field === 'isArgument') {
      updatedData[index][field] = value as boolean;
    } else {
      updatedData[index][field] =
        field === 'value' ? value ?? '' : (value as string);
    }
    props.setVariableList([...updatedData]);
  };

  const handleRemoveRow = (id: number) => {
    const updatedData = props.variableList.filter((row) => row.id !== id);
    const updatedDataWithSequentialIds = updatedData.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    props.setVariableList([...updatedDataWithSequentialIds]);
  };

  const handleTypeChange = (index: number, newType: VariableType) => {
    setSelectedType(newType);
    const updatedData = [...props.variableList];
    const defaultTypeValue = (defaultValue[newType] as string) ?? '';
    updatedData[index].type = newType;
    updatedData[index].value = defaultTypeValue;
    props.setVariableList([...updatedData]);
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
                  <DynamicInputValue
                    row = {row}
                    onChange={(dataTemplate: string, label? : string) => {
                      // console.log(dataTemplate, label)
                      handleEditRow(index, 'value', String(dataTemplate));
                      if(label) {
                        handleEditRow(index, 'label', String(label));
                      }
                    }}
                  >
                  </DynamicInputValue>
              </Td>
              <Td>
                <Select
                  value={row.type}
                  onChange={(e) => {
                    handleTypeChange(index, e.target.value as VariableType);
                  }}>
                  <option value={VariableType.Any}>Any</option>
                  <option value={VariableType.String}>String</option>
                  <option value={VariableType.Number}>Number</option>
                  <option value={VariableType.Boolean}>Boolean</option>
                  <option value={VariableType.File}>File</option>
                  <option value={VariableType.List}>List</option>
                  <option value={VariableType.Dictionary}>Dictionary</option>
                  <option value={VariableType.Connection}>Connection</option>
                  <option value={VariableType.DocumentTemplate}>DocumentTemplate</option>
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
