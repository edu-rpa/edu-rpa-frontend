import apiBase from './config';
import axios from 'axios';

export const getFiles = async (path: string): Promise<string[]> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/file-storage`, {
      params: {
        path,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
