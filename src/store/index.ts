/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
import { useUserAction } from '@/services/user.action';
import { atom, DefaultValue, selector } from 'recoil';
import { AUTH_STORAGE_KEY } from '@/utils/enum';

const localStorageEffect =
  (key: string) =>
    ({ setSelf, onSet }: any) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        try {
          setSelf(JSON.parse(savedValue));
        } catch {
          setSelf(savedValue);
        }
      }

      onSet((newValue: any) => {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      });
    };

export const authToken = atom<string | DefaultValue>({
  key: 'token',
  default: '',
  effects_UNSTABLE: [localStorageEffect('token')],
});

export const userAtom = atom<string | number>({
  key: 'userId',
  default: '',
  effects_UNSTABLE: [localStorageEffect('userId')],
});

export const currentUser = selector<any | null>({
  key: 'user',
  get: async ({ get }) => {
    const token = get(authToken);
    const userId = get(userAtom);
    if (!token) return null;
    const { getUser } = useUserAction();
    try {
      const { data } = await getUser(userId);
      if (!data || !data.user_name) return null;
      return data;
    } catch {
      return null;
    }
  },
});

export const authAtom = atom<any>({
  key: AUTH_STORAGE_KEY,
  default: [],
  effects_UNSTABLE: [localStorageEffect(AUTH_STORAGE_KEY)],
});

export const currentAuths = selector<any>({
  key: 'auths',
  get: async ({ get }) => {
    const auths = get(authAtom);
    try {
      return JSON.parse(auths);
    } catch {
      return [];
    }
  },
});
