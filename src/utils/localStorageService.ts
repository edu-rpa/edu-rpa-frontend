const getLocalStorageObject = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

const setLocalStorageObject = (key: string, value: object[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getLocalStorageObject, setLocalStorageObject };
