import {
  LoginDto,
  ResendOtpDto,
  SignUpDto,
  VerifyOtpDto,
} from '@/dtos/authDto';
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

const verifyOtp = async (payload: VerifyOtpDto) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/auth/verify-otp`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const resendOtp = async (payload: ResendOtpDto) => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/auth/resend-otp`, payload)
    .then((res: any) => {
      return res.data;
    });
};

const authApi = {
  login,
  signUp,
  verifyOtp,
  resendOtp,
};

export default authApi;
