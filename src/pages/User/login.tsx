/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
import { LoginFormPage, ProFormText } from '@ant-design/pro-form';
import { LoginFormType } from '@/types/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { authToken, userAtom, authAtom } from '@/store';
import { useUserAction } from '@/services/user.action';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useMenus } from '@/hooks/useMenus';
import { useSystem } from '@/hooks/useSystem';
import { useAuthorize } from '@/hooks/authorizes';
import './index.less';

const Login = () => {
  const [token, setToken] = useRecoilState(authToken);
  const [user, setUser] = useRecoilState(userAtom);
  const setAuths = useSetRecoilState(authAtom);
  const { login } = useUserAction();
  const navigate = useNavigate();
  const _location: any = useLocation();
  const { getTitle, getLogo, getLoginBackground } = useSystem();
  const { setMenus } = useMenus();

  useEffect(() => {
    token && user && navigate('/');
  }, [navigate, token, user]);

  const onFinish = async (formData: LoginFormType) => {
    const password = formData.password; //window.btoa(formData.password)
    try {
      const auths: any[] = [];
      const { data } = await login({ ...formData, password });
      const childrenEach = (arr: any[], d: any[]) =>
        arr.forEach(({ menu_id, menu_name, children }: any) => {
          d.push({ id: menu_id, name: menu_name });
          if (children) childrenEach(children, d);
        });
      childrenEach(data?.menus || [], auths);
      setAuths(JSON.stringify(auths));
      setToken(data.token);
      setUser(data.user_id);
      setMenus(data.menus);
      useAuthorize(auths);
      if (_location.state) {
        const state: any = _location.state;
        const sourceAddress = state.from.pathname;
        const search = state.from.search;
        navigate(sourceAddress + search);
        return true;
      }
      navigate('/');
      return true;
    } catch {
      return false;
    }
  };

  const renderForm = () => {
    return (
      <React.Fragment>
        <ProFormText
          name="login_name"
          fieldProps={{
            size: 'large',
            prefix: <i className={'iconfont icon-user-3-line prefixIcon'} />,
          }}
          placeholder={'用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            autoComplete: 'on',
            size: 'large',
            prefix: <i className={'iconfont icon-lock-line prefixIcon'} />,
          }}
          placeholder={'密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </React.Fragment>
    );
  };

  const titleEle: any = <div className="titleColor">账号密码登录</div>;
  const title = getTitle() || '';
  return (
    <div className="loginBox">
      <div className="logoBox flex gap-2 items-center cursor-pointer">
        <img src={getLogo()} alt={title} />
        <span className="text">{title}</span>
      </div>
      <LoginFormPage<LoginFormType>
        backgroundImageUrl={getLoginBackground()}
        title={titleEle}
        onFinish={onFinish}
      >
        <div className="formWrap">{renderForm()}</div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
