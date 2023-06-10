import PageLoading from '@/components/PageLoading';
import { Route } from '@ant-design/pro-layout/es/typing';
import React, { Suspense } from 'react';
import { ApartmentOutlined } from '@ant-design/icons';

const Index = React.lazy(() => import('@/pages/Index'));

export const authorizeRouters: Route[] = [
  {
    path: '/home',
    name: '首页',
    icon: <ApartmentOutlined />,
    element: (
      <Suspense fallback={<PageLoading />}>
        <Index />
      </Suspense>
    ),
  },
];
