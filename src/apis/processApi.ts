import {
  CreateProcessDto,
  SaveProcessDto,
  UpdateProcessDto,
} from '@/dtos/processDto';
import apiBase from './config';
import { ProcessResponse } from '@/interfaces/process';

const getAllProcess = async () => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/processes`)
    .then((res: any) => {
      return res.data;
    });
};

const createProcess = async (payload: CreateProcessDto) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/processes`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const getNumberOfProcess = async () => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/processes/count`)
    .then((res: any) => {
      return res.data;
    });
};

const getProcessByID = async (id: string): Promise<ProcessResponse> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/processes/${id}`)
    .then((res: any) => {
      return res.data;
    });
};

const updateProcessByID = async (id: string, payload: UpdateProcessDto) => {
  return await apiBase
    .put(`${process.env.NEXT_PUBLIC_DEV_API}/processes/${id}`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const deleteProcessByID = async (id: string) => {
  return await apiBase
    .delete(`${process.env.NEXT_PUBLIC_DEV_API}/processes/${id}`)
    .then((res: any) => {
      return res.data;
    });
};

const saveProcessByID = async (id: string, payload: SaveProcessDto) => {
  return await apiBase
    .put(`${process.env.NEXT_PUBLIC_DEV_API}/processes/${id}/save`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const processApi = {
  getAllProcess,
  createProcess,
  getNumberOfProcess,
  getProcessByID,
  updateProcessByID,
  deleteProcessByID,
  saveProcessByID,
};

export default processApi;
