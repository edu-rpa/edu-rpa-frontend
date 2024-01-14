import apiBase from './config';

const getMe = async () => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/users/me`)
    .then((res: any) => {
      return res.data;
    });
};

const userApi = {
  getMe,
};

export default userApi;
