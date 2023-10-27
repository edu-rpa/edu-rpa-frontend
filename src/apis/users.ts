import { UserDto } from '@/dtos/userDto';
import apiBase from './config';

const getUserInfo = async (payload: UserDto) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/users/me`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const userApi = {
  getUserInfo,
};

export default userApi;
