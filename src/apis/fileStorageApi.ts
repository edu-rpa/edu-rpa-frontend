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

export const deleteFile = async (fileKey: string): Promise<string> => {
  return await apiBase
    .delete(`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/file-storage`, {
      params: {
        file_key: fileKey,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}

export const uploadFile = async (
  path: string,
  file: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileKey = `${path}${file.name}`;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      apiBase
        .post(`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/file-storage`, reader.result, {
          headers: {
            'Content-Type': file.type,
          },
          params: {
            file_key: fileKey,
          },
        })
        .then((response: any) => response.data)
        .then((data: any) => resolve(data))
        .catch((error: any) => reject(error));
    };
    reader.onerror = (error) => reject(error);
  });
};
