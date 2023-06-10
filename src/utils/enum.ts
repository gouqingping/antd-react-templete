export const AUTH_STORAGE_KEY = '----sys--auths----';

export enum TabName {
  Verify = '校验',
  Review = '审核',
}

export enum TabType {
  Verify = 'verify',
  Review = 'review',
}

export const THROTTLE_TIME = 1000;

export enum USER_MANAGEMENT_TAB_TYPE {
  user = 'user',
  role = 'role',
}

export enum USER_MANAGEMENT_TAB_NAME {
  user = '用户管理',
  role = '系统角色管理',
}

export enum QueryResultType {
  unanimous = '一致',
  section = '部分一致',
}

export const QUERY_RESULT_TYPE = [
  QueryResultType.unanimous,
  QueryResultType.section,
];
