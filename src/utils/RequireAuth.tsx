import React, { JSX } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUser } from '@/store';
import { useMenus } from '@/hooks/useMenus';
import { useAuthorize } from '@/hooks/authorizes';

export default function RequireAuth({ children }: { children?: JSX.Element }) {
  const { getMenus } = useMenus();
  const location = useLocation();
  const { isAuthPage } = useAuthorize();
  const userInfo: { [k: string]: any } = useRecoilValue(currentUser);
  if (!userInfo)
    return <Navigate to="/login" state={{ from: location }} replace />;
  if (!isAuthPage(getMenus()))
    return <Navigate to="/result" state={{ from: location }} replace />;
  return children || <Outlet />;
}
