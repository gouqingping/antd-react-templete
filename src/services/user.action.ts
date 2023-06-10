/* eslint-disable camelcase */
import { LoginFormType } from '@/types/user';
import { useFetch } from '@/hooks/useFetch';
import { useSystem } from '@/hooks/useSystem';
import { DefaultValue, useSetRecoilState } from 'recoil';
import { authToken } from '@/store';
import { useNavigate } from 'react-router-dom';
import { userLogin, getUserInfo } from '@/mock/user';
import { useRecoilValue } from 'recoil';

export const useUserAction = () => {
  const request = useFetch();
  const { isPro, getRequest } = useSystem();
  const setToken = useSetRecoilState(authToken);
  const token = useRecoilValue(authToken);
  const navigate = useNavigate();

  const url = `${getRequest()}/api/user`;

  const login = (data: LoginFormType) =>
    isPro() ? request.post(`${url}/login`, data) : userLogin(data);

  const getUser = async (user_id: number | string) =>
    (isPro()
      ? request.get(`${url}/update`, { user_id })
      : getUserInfo({ user_id })
    ).catch(() => {
      setToken('');
      navigate('/login');
    });

  const logout = () => {
    isPro() && request.post(`${url}/logout`, { token });
    setToken(new DefaultValue());
    navigate('/login');
  };

  return {
    login,
    getUser,
    logout,
  };
};
