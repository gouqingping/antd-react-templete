/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MockFun } from '@/utils';
import { v4 as uuidv4 } from 'uuid';
import {
  LoginFormType,
  LogoutType,
  UserIdInter,
  UpdateUserInfoInter,
} from '@/types/user';

export const userLogin = (_d: LoginFormType) => {
  const data = {
    user_id: uuidv4(),
    token: uuidv4(),
    menus: [],
  };
  return MockFun(data);
};

export const userLogout = (params: LogoutType) =>
  MockFun({ user_id: params.user_id });

export const getUserInfo = (_params: UserIdInter) =>
  MockFun({
    user_id: uuidv4(),
    user_name: 'admin',
    original_roles: [
      {
        role_id: uuidv4(),
        role_name: 'role_name',
      },
    ],
    roles: [
      {
        role_id: uuidv4(),
        role_name: 'role_name',
      },
    ],
  });

export const userUpdate = (params: UpdateUserInfoInter) =>
  MockFun({ user_id: params.user_id });
