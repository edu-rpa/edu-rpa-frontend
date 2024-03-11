export interface LoginDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  name: string;
  email: string;
  password: string;
}

export interface VerifyOtpDto {
  email: string;
  otpCode: string;
}

export interface ResendOtpDto {
  email: string;
}
