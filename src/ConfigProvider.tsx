/* eslint-disable react/display-name */
import React from 'react';
import dayjs from 'dayjs';
import { useSystem } from '@/hooks/useSystem';
import ConfigProvider, { ConfigProviderProps } from 'antd/es/config-provider';
import zhCN from 'antd/lib/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import './styles/index.less';

// 读取样式配置
// import variables from './styles/config.module.less';
// console.log(variables, 'variables----');

dayjs.locale('zh-cn');

export default (props: ConfigProviderProps) => {
  const { getTheme } = useSystem();
  const primaryColor = getTheme('primaryColor', '#00b96b');
  ConfigProvider.config({
    theme: { primaryColor },
  });
  const locale: any = {
    ...zhCN,
    DatePicker: {
      lang: {
        ...zhCN.DatePicker?.lang,
        shortMonths: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split(
          '_',
        ),
        shortWeekDays: '日_一_二_三_四_五_六'.split('_'),
      },
    },
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          borderRadius: getTheme('borderRadius', 8),
        },
      }}
      {...props}
      locale={locale}
    >
      {props.children}
    </ConfigProvider>
  );
};
