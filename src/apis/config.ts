import axios from 'axios';
import { getProfileFromLocalStorage } from './authentication';
import { localStorageService } from '@/utils/localStorageService';

const apiBase = axios.create();
apiBase.interceptors.request.use((config) => {
  const profileLocal = localStorageService.getProfile();
  if (profileLocal?.accessToken) {
    config.headers.Authorization = `Bearer ${profileLocal.accessToken}`;
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
