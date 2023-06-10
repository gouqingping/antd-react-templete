export interface LoginFormType {
  login_name: string;
  password: string;
}

export interface UserIdInter {
  user_id: number | string;
}

export interface UserRoleInter {
  role_id: number | string;
  role_name: string;
}

export interface LogoutType extends UserIdInter {
  token: string;
}

export interface UpdateUserInfoInter extends UserIdInter {
  roles: UserRoleInter[];
}
