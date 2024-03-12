const getLocalStorageObject = (key: string) => {
  const currentStorage = localStorage.getItem(key);
  if (!currentStorage) {
    return [];
  }
  try {
    return JSON.parse(currentStorage);
  } catch (e) {
    console.error(`Error parsing storage for key "${key}". Returning empty array.`, e);
    return [];
  }
};

const setLocalStorageObject = (key: string, value: object[] | string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getLocalStorageObject, setLocalStorageObject };
