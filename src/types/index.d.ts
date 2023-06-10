export interface PageInfo {
  page: number;
  pageSize: number;
  total: number;
}

export interface ResultDataType<T> {
  code: number;
  data: T;
  pageInfo?: PageInfo;
  total?: number;
  message?: string;
  msg?: string;
}
