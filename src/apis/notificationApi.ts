import apiBase from './config';
import { Notification } from '@/interfaces/notification';

const getNotifications = async (limit: number, page: number): Promise<Notification[]> => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_DEV_API}/notification?limit=${limit}&page=${page}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const getCountUnread = async (): Promise<number> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/notification/count/unread`)
    .then((res: any) => {
      return res.data;
    });
};

const markAsRead = async (id: number) => {
  return await apiBase
    .put(`${process.env.NEXT_PUBLIC_DEV_API}/notification/mark-as-read`, {
      id,
    })
    .then((res: any) => {
      return res.data;
    });
};

const notificationApi = {
  getNotifications,
  getCountUnread,
  markAsRead,
};

export default notificationApi;
