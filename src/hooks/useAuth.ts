import { LocalStorage } from '@/constants/localStorage';

const useAuth = () => {
  const setAuthToken = () => {
    localStorage.setItem(LocalStorage.ACCESS_TOKEN, 'Guest');
  };

  const removeAuthToken = () => {
    localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorage.PROCESS_LIST);
    localStorage.removeItem(LocalStorage.VARIABLE_LIST);
  };

  return { setAuthToken, removeAuthToken };
};

export default useAuth;
