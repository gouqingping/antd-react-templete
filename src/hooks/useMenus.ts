import { authorizeRouters } from '@/routes/authorizeRouters';
import { useAuthorize, AuthorizeModule } from '@/hooks/authorizes';
import { currentAuths } from '@/store';
import { useRecoilValue } from 'recoil';

const getProject = (): AuthorizeModule[] =>
  [...authorizeRouters]
    .filter((item) => !!item.name && item.hide !== true)
    .map((item) => {
      if (!item?.icon) item.icon = 'icon-gerengongzuotai1';
      return item;
    }) as AuthorizeModule[];

let currentMenus: AuthorizeModule[] = [];

export const useMenus = () => {
  const auths = useRecoilValue(currentAuths);
  const { setAuths, getAuths, canAuthorize } = useAuthorize();
  const routes = getProject();
  const filter = (arr: any[], authList: AuthorizeModule[]) =>
    arr
      .filter((item) => !!item?.name && item.hide !== true)
      .map((item) => {
        if (item.children?.length > 0) {
          const childrens = filter(
            item.children.filter((s: any) => s.hide !== true),
            authList,
          );
          const childs = getAuths(childrens);
          item.children = (childs.length && childs) || undefined;
        }

        const currentMenuAuth = authList.find((i) => i.name === item.name);
        item.code = currentMenuAuth ? currentMenuAuth.code : item.path;
        return item;
      });
  const getMenus = (): AuthorizeModule[] => canAuthorize(currentMenus);
  const setMenus = (authList: AuthorizeModule[]): void => {
    // if (!authList.length) return;
    const currentAuthLists = authList.map(
      ({ id, name }: { [k: string]: any }) => ({ code: id, name }),
    );
    setAuths(currentAuthLists);
    currentMenus = getAuths(filter(routes, currentAuthLists));
  };
  !currentMenus.length && auths && setMenus(auths);
  return { getMenus, setMenus, currentMenus, filter };
};
