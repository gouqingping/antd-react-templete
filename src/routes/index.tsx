import Login from '@/pages/User/login';
import RequireAuth from '@/utils/RequireAuth';
import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { authorizeRouters } from '@/routes/authorizeRouters';
import PageLoading from '@/components/PageLoading';
import { Route } from '@ant-design/pro-layout/es/typing';
const CommonLayout = React.lazy(() => import('@/layout/CommonLayout'));
const ResultPage = React.lazy(() => import('@/pages/Result'));
const ArrayRoutes: Route[] = [
  {
    path: '/login',
    name: '登陆',
    element: <Login />,
  },
  {
    path: '/result',
    name: '结果页',
    element: <ResultPage />,
  },
  {
    element: (
      <Suspense fallback={<PageLoading />}>
        <RequireAuth />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: <Navigate to={'/home'} />,
      },
      {
        element: (
          <Suspense fallback={<PageLoading />}>
            <CommonLayout />
          </Suspense>
        ),
        children: authorizeRouters,
      },
    ],
  },
  {
    path: '*',
    element: <ResultPage />,
  },
];

export { ArrayRoutes };
