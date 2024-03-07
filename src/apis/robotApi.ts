import { CreateRobotDto } from '@/dtos/robotDto';
import apiBase from './config';

const getAllRobot = async (limit: number, page: number) => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/robot?limit=${limit}&page=${page}`)
    .then((res: any) => {
      return res.data;
    });
};

const createRobot = async (payload: CreateRobotDto) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/robot`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const getNumberOfRobot = async () => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/robot/count`)
    .then((res: any) => {
      return res.data;
    });
};

const getRobotByID = async (id: string) => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/robot/${id}`)
    .then((res: any) => {
      return res.data;
    });
};

const geRobotDetail = async (userId: number, processId: string, version: number) => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/robot/detail?user_id=${userId}&process_id=${processId}&version=${version}`)
    .then((res: any) => {
      return res.data;
    });
};

const stopRobot = async (userId: number, processId: string, version: number) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/robot/stop`, {
      user_id: userId.toString(),
      process_id: processId,
      version: version,
    })
    .then((res: any) => {
      return res.data;
    });
};

const runRobot = async (userId: number, processId: string, version: number) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/robot/run`, {
      user_id: userId.toString(),
      process_id: processId,
      version: version,
    })
    .then((res: any) => {
      return res.data;
    });
};

const robotApi = {
  getAllRobot,
  createRobot,
  getNumberOfRobot,
  getRobotByID,
  geRobotDetail,
  stopRobot,
  runRobot,
};

export default robotApi;
