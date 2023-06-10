/**
 * 
 * useAuthorize 根据唯一code验证
 * 
 * 
 * main.js 注册鉴权列表
  useAuthorize([
  {
    name: '文件管理',
    code: '/work',
  }
  ].map(({ name, code }, id) => ({ name, code, id })));
 *
 * // 数组验证返回验证通过后的原始数据
  import { useAuthorize } from '@/hooks/authorizes'
  const { canAuthorize } = useAuthorize();
  const route = canAuthorize([
    {
    name: '文件管理',
    code: '/work',
    }
  ])
 *
 * // 手动添加按钮验证
  import { useAuthorize } from '@/hooks/authorizes'
  const { addBtnAuth } = useAuthorize();
  addBtnAuth({
    name: 'iButton',
    code: 'btn-primary-1',
  })
 *
 * // 单验证返回布尔值
  import { useAuthorize } from '@/hooks/authorizes'
  const { canOperate } = useAuthorize();
  canOperate({
    name: 'iButton',
    code: 'btn-primary-1',
  }) ? <Button type='primary' >Button</Button> : '1111'
 *
 */
import { ReactNode } from 'react';
import { isObject, uniqBy } from 'lodash';

interface Route {
  routes?: undefined;
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: ReactNode;
  name?: string;
  key?: string;
  disabled?: boolean;
  path?: string;
  [k: string]: any;
}

export interface AuthorizeModule {
  name: string;
  code: string;
  id?: number;
  url?: string;
  routes?: Route[];
  [k: string]: any;
}

const defaultAuths: AuthorizeModule[] = [
  { code: '/home', name: '首页' },
];

let [authList, authBtnList, authRouteList]: AuthorizeModule[][] = [[], [], []];

export const useAuthorize = (modules?: AuthorizeModule[]) => {
  if (Array.isArray(modules)) authList = [...authList, ...modules];
  const canOperate = (module: AuthorizeModule) => {
    if (!isObject(module)) return true;
    let currentCanOperate = true;
    const currentAuth = authList.find(
      (item: AuthorizeModule) =>
        [module.code].includes(item.code) || item.name === module.name,
    );
    if (currentAuth) currentCanOperate = currentAuth.code === module.code;
    return !!(currentAuth && currentCanOperate);
  };
  const isAuthPage = (auList?: AuthorizeModule[]) => {
    let isAuth = false;
    if (!auList || (Array.isArray(auList) && auList.length === 0)) return true;
    auList.forEach((item: AuthorizeModule) => (isAuth = canOperate(item)));
    return isAuth;
  };

  const canChildAuthOrize = (
    currentItem: AuthorizeModule,
    childRoute: Route[],
  ) => {
    const childRoutes: Route[] = [];
    currentItem.routes = childRoute;
    return childRoutes.length > 0 ? currentItem : null;
  };

  const canAuthorize = (auList: AuthorizeModule[]) => {
    const notProcessList: any[] = [];
    auList.forEach((i: AuthorizeModule) => {
      if (!i.code) {
        notProcessList.push(i);
      } else if (i.routes) {
        const currentItem = canChildAuthOrize(i, i.routes);
        currentItem && notProcessList.push(currentItem);
      } else notProcessList.push(i);
    });
    return notProcessList;
  };
  const authTo = (name: string) => {
    const current = authList.find(
      (auth) => auth.name === name || auth.code === name,
    );
    return current ? canOperate(current) : false;
  };
  const getAuths = (values?: AuthorizeModule[]) => {
    if (values && Array.isArray(authList))
      return values.filter((item: AuthorizeModule) => isAuthPage([item]));
    return authList;
  };
  const setAuths = (values: AuthorizeModule[]) =>
    (authList = [...defaultAuths, ...values]);
  const setRouteAuths = (values: AuthorizeModule[]) => {
    authRouteList = values;
    setAuths([...values, ...authBtnList]);
  };
  const addRouteAuth = (value: AuthorizeModule) => {
    authRouteList = uniqBy([...authRouteList, value], (item) => item.name);
    setAuths([...authRouteList, ...authBtnList]);
  };
  const setBtnAuths = (values: AuthorizeModule[]) => {
    authBtnList = values;
    setAuths([...values, ...authRouteList]);
  };
  const addBtnAuth = (value: AuthorizeModule) => {
    authBtnList = uniqBy([...authBtnList, value], (item) => item.name);
    setAuths([...authRouteList, ...authBtnList]);
  };
  return {
    canOperate,
    isAuthPage,
    canAuthorize,
    setAuths,
    authTo,
    getAuths,
    setRouteAuths,
    addRouteAuth,
    setBtnAuths,
    addBtnAuth,
  };
};
