import React from 'react';
import { currentUser } from '@/store';
import { useRecoilValue } from 'recoil';
import { useUserAction } from '@/services/user.action';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Divider, Typography } from 'antd';

const AvatarDropdown = (props: any) => {
  const { logout } = useUserAction();
  const userInfo = useRecoilValue(currentUser);
  return (
    <Popover
      content={
        <>
          {props.children}
          {props.children && <Divider />}
          <Typography.Text style={{ cursor: 'pointer' }} onClick={logout}>
            退出登录
          </Typography.Text>
        </>
      }
      trigger="click"
    >
      <div className="avatar-main">
        <Avatar
          style={{ backgroundColor: 'var(--ant-primary-color)' }}
          icon={<UserOutlined />}
        />
        <span className="name">{userInfo?.user_name}</span>
      </div>
    </Popover>
  );
};
export default AvatarDropdown;
