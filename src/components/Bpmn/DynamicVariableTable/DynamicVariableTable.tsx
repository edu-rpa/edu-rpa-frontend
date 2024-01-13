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
} from '@chakra-ui/react';
import { Variable, VariableType } from '@/types/variable';
import { useDispatch } from 'react-redux';
import { isSavedChange } from '@/redux/slice/bpmnSlice';

interface VariableTableProps {
  variableList: Variable[];
  setVariableList: (value: Variable[]) => void;
}

const DynamicVariableTable = (props: VariableTableProps) => {
  const dispatch = useDispatch();
  const handleAddRow = () => {
    const newRow: Variable = {
      id: props.variableList.length + 1,
      name: '',
      value: '',
      type: VariableType.String,
    };
    props.setVariableList([...props.variableList, newRow]);
    dispatch(isSavedChange(false));
  };

  const handleEditRow = (
    index: number,
    field: 'name' | 'value' | 'type',
    value: string
  ) => {
    const updatedData = [...props.variableList];
    updatedData[index][field] = value;
    props.setVariableList(updatedData);
  };

  const handleRemoveRow = (index: number) => {
    const updatedData = props.variableList.filter((_, i) => i !== index);
    updatedData.forEach((item, i) => {
      item.id = i + 1;
    });
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
                  defaultValue={row.type}
                  onChange={(e) => {
                    handleEditRow(index, 'type', e.target.value);
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
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveRow(index)}>
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
