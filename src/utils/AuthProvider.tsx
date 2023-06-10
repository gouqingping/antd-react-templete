import React, { useEffect } from 'react';
import type { VoidFunction } from './auth';
import { fakeAuthProvider } from './auth';

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
const AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
  return React.useContext(AuthContext);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<any>(null);
  const signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  useEffect(() => {
    window.onstorage = (e) => {
      if (!e.newValue || e.key !== 'token') return;
      const newToken = JSON.parse(e.newValue);
      // 如果用户在别的页签重新登录别的用户，重新加载其他页面 更新用户信息
      if (newToken) window.location.reload();
    };
  }, []);

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
