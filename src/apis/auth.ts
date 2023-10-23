import { LoginDto, SignUpDto } from '@/dto/authDto';
import apiBase from './config';

const login = async (payload: LoginDto) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/auth/login`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const signUp = async (payload: SignUpDto) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/auth/register`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const authApi = {
  login,
  signUp,
};

export default authApi;
