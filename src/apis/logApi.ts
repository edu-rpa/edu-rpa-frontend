import { LogEvent, LogStream } from '@/interfaces/log';
import apiBase from './config';

const getStreamLogs = async (groupName: string): Promise<LogStream[]> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/logs/streams?group=${groupName}`)
    .then((res: any) => {
      return res.data.data;
    });
};

const getLogStreamDetail = async (
  groupName: string,
  streamName: string
): Promise<LogEvent[]> => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_DEV_API}/logs/streams/detail?group=${groupName}&stream=${streamName}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const logApi = {
  getStreamLogs,
  getLogStreamDetail,
};

export default logApi;
