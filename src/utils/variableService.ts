import { VariableItem } from '@/types/variable';
import { getLocalStorageObject } from './localStorageService';
import { LocalStorage } from '@/constants/localStorage';

const getVariableItemFromLocalStorage = (processID: string) => {
  return getLocalStorageObject(LocalStorage.VARIABLE_LIST).find(
    (variable: VariableItem) => variable.processID === processID
  );
};

const getIndexVariableStorage = (processID: string) => {
  const currLocalStorage = getLocalStorageObject(LocalStorage.VARIABLE_LIST);
  return currLocalStorage.findIndex(
    (x: VariableItem) => x.processID === processID
  );
};

const replaceVariableStorage = (processID: string, newObj: VariableItem) => {
  const index = getIndexVariableStorage(processID);
  const currLocalStorage = getLocalStorageObject(LocalStorage.VARIABLE_LIST);
  currLocalStorage[index] = newObj;
  return currLocalStorage;
};

const deleteVariableById = (processID: string) => {
  const currLocalStorage = getLocalStorageObject(LocalStorage.VARIABLE_LIST);
  return currLocalStorage.filter(
    (item: VariableItem) => item.processID !== processID
  );
};

export {
  getVariableItemFromLocalStorage,
  replaceVariableStorage,
  deleteVariableById,
};
