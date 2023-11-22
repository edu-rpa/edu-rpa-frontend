import { LocalStorage } from '@/constants/localStorage';

type Optional<I> = {
  [P in keyof I]?: I[P];
};

export class Profile {
  accessToken?: string;
}

class LocalStorageService {
  getProfile(): Profile | undefined {
    const profileJson = localStorage.getItem(LocalStorage.PROFILE);
    const profileLocal = profileJson && (JSON.parse(profileJson) as Profile);
    return profileLocal || undefined;
  }

  setProfile(data: Profile) {
    localStorage.setItem(LocalStorage.PROFILE, JSON.stringify(data));
  }

  updateProfile(data: Optional<Profile>) {
    const currentProfile = this.getProfile() || {};
    localStorage.setItem(
      LocalStorage.PROFILE,
      JSON.stringify({
        ...currentProfile,
        ...data,
      })
    );
  }

  removeProfile() {
    localStorage.removeItem(LocalStorage.PROFILE);
  }
}

export const localStorageService = new LocalStorageService();
