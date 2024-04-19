import apiBase from './config';
import { Notification } from '@/interfaces/notification';

export const NOTI_PAGE_LIMIT = 5;

const getNotifications = async (page: number): Promise<Notification[]> => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_DEV_API}/notification?limit=${NOTI_PAGE_LIMIT}&page=${page}`
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
