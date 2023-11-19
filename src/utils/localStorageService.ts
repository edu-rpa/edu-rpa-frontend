const getLocalStorageObject = (key: string) => {
  const currentStorage = localStorage.getItem(key);
  return currentStorage ? JSON.parse(currentStorage) : [];
};

const setLocalStorageObject = (key: string, value: object[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getLocalStorageObject, setLocalStorageObject };
