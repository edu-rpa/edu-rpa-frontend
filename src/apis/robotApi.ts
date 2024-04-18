import {
  CreateRobotDto,
  CreateScheduleDto,
  UpdateScheduleDto,
  EventSchedule,
} from '@/dtos/robotDto';
import apiBase from './config';
import { Schedule } from '@/interfaces/robot';

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

const getRobotDetail = async (
  userId: number,
  processId: string,
  version: number
) => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/robot/detail?user_id=${userId}&process_id=${processId}&version=${version}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const stopRobot = async (
  userId: number,
  processId: string,
  version: number
) => {
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
      trigger_type: 'manual',
    })
    .then((res: any) => {
      return res.data;
    });
};

const getSchedule = async (
  userId: number,
  processId: string,
  version: number
): Promise<Schedule> => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/schedule?user_id=${userId}&process_id=${processId}&version=${version}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const deleteSchedule = async (
  userId: number,
  processId: string,
  version: number
) => {
  return await apiBase
    .post(
      `${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/schedule/delete`,
      {
        user_id: userId.toString(),
        process_id: processId,
        version: version,
      }
    )
    .then((res: any) => {
      return res.data;
    });
};

const createSchedule = async (
  userId: number,
  processId: string,
  version: number,
  createScheduleDto: CreateScheduleDto
) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/schedule`, {
      user_id: userId.toString(),
      process_id: processId,
      version: version,
      create_schedule_dto: createScheduleDto,
    })
    .then((res: any) => {
      return res.data;
    });
};

const updateSchedule = async (
  userId: number,
  processId: string,
  version: number,
  updateScheduleDto: UpdateScheduleDto
) => {
  return await apiBase
    .put(`${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/schedule`, {
      user_id: userId.toString(),
      process_id: processId,
      version: version,
      update_schedule_dto: updateScheduleDto,
    })
    .then((res: any) => {
      return res.data;
    });
};

const upsertEventSchedule = async (
  userId: number,
  processId: string,
  version: number,
  eventSchedule: EventSchedule
) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_AWS_ROBOT_API_GATEWAY_URL}/event`, {
      user_id: userId.toString(),
      process_id: processId,
      version: version,
      event_schedule: eventSchedule,
    })
    .then((res: any) => {
      return res.data;
    });
};

const robotApi = {
  getAllRobot,
  createRobot,
  getNumberOfRobot,
  getRobotDetail,
  stopRobot,
  runRobot,
  getSchedule,
  deleteSchedule,
  createSchedule,
  updateSchedule,
  upsertEventSchedule,
};

export default robotApi;
