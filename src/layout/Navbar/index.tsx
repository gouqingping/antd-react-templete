import React, { FC, JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';
import './index.less';

interface INavbar {
  avatarContentRender?: () => JSX.Element;
  children?: JSX.Element;
  layout?: 'mix' | 'top';
  logo?: any;
  title?: string;
}

const Navbar: FC<INavbar> = ({
  avatarContentRender,
  children,
  layout,
  logo,
  title,
}) => {
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <div className="content">
        {layout === 'top' && (
          <div className="nav-logo-block" onClick={() => navigate('/')}>
            {logo && <img className="logo" src={logo} alt={title} />}
            <div className="title">{title}</div>
          </div>
        )}
        <div className="meun">{children}</div>
      </div>
      <div className="profile-block flex justify-end items-center gap-7 cursor-pointer">
        <AvatarDropdown>
          {avatarContentRender && avatarContentRender()}
        </AvatarDropdown>
      </div>
    </nav>
  );
};

export default Navbar;
