import { LocalStorage } from '@/constants/localStorage';
import { getLocalStorageObject } from '@/utils/localStorageService';
import axios from 'axios';

const apiBase = axios.create();
apiBase.interceptors.request.use((config) => {
  const accessToken = getLocalStorageObject(LocalStorage.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiBase.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response?.status === 400) {
      if (error.response.data?.error?.details?.length > 0) {
        console.error(error.response.data?.error?.details[0]?.vi?.message);
      } else {
        console.error(error.response.data?.error?.message);
      }
    }
    throw error;
  }
);

export default apiBase;
