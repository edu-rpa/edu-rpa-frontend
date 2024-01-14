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

export const createFolder = async (path: string): Promise<string> => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/file-storage/folder`, {}, {
      params: {
        path,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}

export const getPresignedUrl = async (fileKey: string): Promise<{ url: string }> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/file-storage/presigned-url`, {
      params: {
        file_key: fileKey,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
