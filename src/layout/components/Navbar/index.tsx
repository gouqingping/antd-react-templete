import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, Button } from 'antd';
import './index.css';

interface INavbar {
  routeData: { name: string; path: string; status: string }[];
  selectPath: string;
}

const Navbar: FC<INavbar> = ({ routeData, selectPath }) => {
  return (
    <div className="flex justify-start items-center">
      {routeData.map((route, index) => {
        if (route.status === 'disabled')
          return (
            <Tooltip
              placement="top"
              title={'该功能在火速开发中...'}
              key={index}
            >
              <Button type="link" disabled key={route.path} title={route.name}>
                {route.name}
              </Button>
            </Tooltip>
          );

        return (
          <Link
            key={route.path}
            title={route.name}
            to={route.path}
            className={`cursor-pointer nav-link ${
              route.path === selectPath ? 'nav-link-active' : ''
            }`}
          >
            {route.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
