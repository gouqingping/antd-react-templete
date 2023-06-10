import React, { Dispatch, Fragment, ReactNode, SetStateAction, useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import styles from '../../index.module.less';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { ItemType } from 'antd/lib/menu/hooks/useItems';

interface Props {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  routes: any[];
  extendDom?: ReactNode;
  items?: ItemType[];
  logo?: any;
  title?: string;
  layout?: 'mix' | 'top';
}

const Sidebar: React.FC<Props> = (props) => {
  const { collapsed, setCollapsed, routes, extendDom, items, title, logo, layout } =
    props;

  const location = useLocation();
  const navigate = useNavigate();

  const getOpenKeys = (key: string = location.pathname) => {
    let keys: string[] = [];
    routes.forEach((item: any) =>
      item.routes?.forEach((route: any) => {
        if (route.path === key) keys = [item.path];
      }),
    );

    return keys;
  };

  const [openKeys, setOpenKeys] = useState<string[]>(getOpenKeys());

  const renderSelectedKeys = () => [location.pathname];

  return (
    <Fragment>
      {
        layout === 'top' ? (
          <Menu
            forceSubMenuRender={true}
            onOpenChange={(keys) => setOpenKeys(keys)}
            openKeys={openKeys}
            selectedKeys={renderSelectedKeys()}
            mode={"horizontal"}
            className={styles.layoutMenu}
            style={{ flex:1 }}
            onClick={(e) => navigate(e.key)}
            items={items}
          />
        ) : (
          <Sider
          className={styles.projectSidebar}
          collapsible
          collapsed={collapsed}
          width={232}
          onCollapse={(value) => setCollapsed(value)}
          trigger={
            <div>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
          }
        >
          <div
            className={`${
              styles.sidebarLogoBlock
            } flex gap-2 items-center cursor-pointer 
              ${collapsed ? 'justify-center' : 'pl-2'}`}
            onClick={() => navigate('/')}
          >
            {logo && <img className={styles.logo} src={logo} alt="" />}
            <div className="title">{collapsed ? '' : title}</div>
          </div>
          {extendDom}
          <Menu
            forceSubMenuRender={true}
            onOpenChange={(keys) => setOpenKeys(keys)}
            openKeys={openKeys}
            selectedKeys={renderSelectedKeys()}
            mode={"inline"}
            className={styles.layoutMenu}
            style={{
              overflowY: 'auto',
              paddingBottom: 32,
            }}
            onClick={(e) => navigate(e.key)}
            items={items}
          />
          </Sider>
        )
      }
    </Fragment>
  );
};

export default Sidebar;
