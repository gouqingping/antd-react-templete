import React, { ReactDOM, useState, Fragment } from 'react';
import { Layout, Tooltip } from 'antd';
import { Outlet, useParams } from 'react-router-dom';
import styles from './index.module.less';
import { Content, Header } from 'antd/es/layout/layout';
import Navbar from '@/layout/Navbar';
import Sidebar from '@/layout/components/Sidebar';
import { useAuthorize } from '@/hooks/authorizes';
import { useMenus } from '@/hooks/useMenus';
import { useSystem } from '@/hooks/useSystem';
import { isString } from 'lodash';

const styleIco = { fontSize: 16 };
const CommonLayout: React.FC<{
  layout?: 'mix' | 'top';
  isNotPadding?: boolean,
  showHeader?: boolean,
}> = (props: {
  layout?: 'mix' | 'top';
  isNotPadding?: boolean;
  showHeader?: boolean;
}) => {
  const { isNotPadding, showHeader, layout } = { layout: 'mix', ...(props || {})};
  const params = useParams();
  const { canAuthorize } = useAuthorize();

  const [collapsed, setCollapsed] = useState(false);

  const { getMenus } = useMenus();
  const { getTitle, getLogo } = useSystem();
  const getRoutes = () =>
    canAuthorize(
      getMenus().map((item) => {
        if (isString(item.icon))
          item.icon = (
            <i className={`iconfont ${item.icon}`} style={styleIco} />
          ) as unknown as ReactDOM;
        return item;
      }),
    );

  const routes = getRoutes();

  const updateMenus = (menus: any[]): any[] => {
    return menus.map((item: any) => {
      const label =
        item.status === 'disabled' ? (
          <Tooltip placement={'right'} title={'该功能在火速开发中...'}>
            {item.name}
          </Tooltip>
        ) : (
          item.name
        );
      return {
        label,
        disabled: item.status === 'disabled',
        icon: item.icon || undefined,
        key: item.path,
        children: (item.children && updateMenus(item.children)) || undefined,
      };
    });
  };

  const items = updateMenus(routes);

  const [logo, title] = [getLogo(), getTitle()];

  const hideHeader = showHeader !== false;


  return (
    <Layout
      className={styles.layoutWrap}
      key={params.projectId || params.demandId}
    >
      {
        layout !== 'top' ? <Sidebar
        items={items}
        routes={routes}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        title={title}
        logo={logo}
      /> : <Fragment/>
      }
      <Layout>
        {
          hideHeader ? (
            <Header
              className={styles.layoutHeader}
              style={{
                width: collapsed ? 'calc(100% - 80px)' : layout === 'top' ? '100%':'calc(100% - 232px)',
              }}
            >
              <Navbar layout={layout as any} title={title} logo={logo}>
                {layout === 'top' ? <Sidebar
                  layout={layout as any}
                  items={items}
                  routes={routes}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  title={title}
                  logo={logo}
                /> : <Fragment />}
              </Navbar>
            </Header>
          ) : <Fragment/>
        }
        <Content
          className={styles.layoutContent}
          style={{
            ...((isNotPadding && { padding: 0 }) || {}),
            ...(!hideHeader ? { margin:0 } : {}),
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
