import { UpdateProfileDto } from '@/dtos/userDto';
import apiBase from './config';

const getMe = async () => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/users/me`)
    .then((res: any) => {
      return res.data;
    });
};

const updateProfile = async (payload: UpdateProfileDto) => {
  return await apiBase
    .put(`${process.env.NEXT_PUBLIC_DEV_API}/users/me`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/users/me/avatar`, formData)
    .then((res: any) => {
      return res.data;
    });
};

const userApi = {
  getMe,
  updateProfile,
  uploadAvatar,
};

export default userApi;
