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

//   const updateRobotByID = async (id: string, payload: UpdateRobotDto) => {
//     return await apiBase
//       .put(`${process.env.NEXT_PUBLIC_DEV_API}/robot/${id}`, payload)
//       .then((res: any) => {
//         return res.data;
//       });
//   };

//   const deleteRobotByID = async (id: string) => {
//     return await apiBase
//       .delete(`${process.env.NEXT_PUBLIC_DEV_API}/robot/${id}`)
//       .then((res: any) => {
//         return res.data;
//       });
//   };

//   const saveRobotByID = async (id: string, payload: SaveRobotDto) => {
//     return await apiBase
//       .put(`${process.env.NEXT_PUBLIC_DEV_API}/robot/${id}/save`, payload)
//       .then((res: any) => {
//         return res.data;
//       });
//   };

const robotApi = {
  getAllRobot,
  createRobot,
  getNumberOfRobot,
  getRobotByID,
  //   updateRobotByID,
  //   deleteRobotByID,
  //   saveRobotByID,
};

export default robotApi;
