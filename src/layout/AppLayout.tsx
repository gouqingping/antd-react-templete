import RenderHeader from '@/layout/components/RenderHeader';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import Navbar from '@/layout/Navbar';
import styles from './index.module.less';

const AppLayout: React.FC = () => {
  return (
    <Layout className={styles.layoutWrap}>
      <Header className={styles.layoutHeader}>
        <Navbar layout={'top'}>
          <RenderHeader />
        </Navbar>
      </Header>
      <Content className={styles.layoutContent}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
