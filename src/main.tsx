/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/rules-of-hooks */
import App from '@/App';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import ConfigProvider from './ConfigProvider';
import { BrowserRouter } from 'react-router-dom';
import { useAuthorize } from '@/hooks/authorizes';
useAuthorize(
  [
    {
      name: '首页',
      code: '/home',
    },
  ].map(({ name, code }, id) => ({ name, code, id })),
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </ConfigProvider>,
);
