import { LocalStorage } from '@/constants/localStorage';

export const getProfileFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  const profile = localStorage.getItem(LocalStorage.PROFILE) as string;
  return JSON.parse(profile);
};

export const setProfileToLocalStorage = (profile: any) => {
  localStorage.setItem(LocalStorage.PROFILE, JSON.stringify(profile));
};
