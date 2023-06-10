import React from 'react';
import { Button, Space, Typography } from 'antd';
import { useAuthorize } from '@/hooks/authorizes';

const Workbench = () => {
  const { addBtnAuth, canOperate } = useAuthorize();
  addBtnAuth({
    name: 'iButton',
    code: 'btn-primary',
  });
  return (
    <>
      有权限显示按钮，没权限显示文字“没有权限”:{' '}
      {canOperate({
        name: 'iButton',
        code: 'btn-primary',
      }) ? (
        <Button type="primary">Home</Button>
      ) : (
        '没有权限'
      )}
      <Typography style={{ padding: '20px 0' }}>
        <Typography.Title>配置 Api 地址</Typography.Title>
        <Typography.Paragraph>
          <Space wrap>
            <Button
              onClick={() => {
                location.href = 'https://www.npmjs.com/package/ambiences';
              }}
            >
              .ambiences 环境变量配置 API
            </Button>
            <Button
              onClick={() => {
                location.href =
                  'https://ant.design/docs/react/customize-theme-cn#theme';
              }}
            >
              ConfigProvider.tsx 文件主题配置 API
            </Button>
            <Button
              onClick={() => {
                location.href = 'https://ant.design/docs';
              }}
            >
              内置UI组件 API
            </Button>
          </Space>
        </Typography.Paragraph>
      </Typography>
      <Typography style={{ padding: '20px 0' }}>
        <Typography.Title>自定义全局样式配置 styles</Typography.Title>
        <Typography.Paragraph>
          <Space wrap>
            <Button type="link">styles/config.module.less</Button>
          </Space>
        </Typography.Paragraph>
      </Typography>
      <Typography style={{ padding: '20px 0' }}>
        <Typography.Title>内置 HOOKS</Typography.Title>
        <Typography.Paragraph>
          <Space wrap>
            <Button type="link">hooks/authorizes.ts 前端鉴权控制</Button>
            <Button type="link">hooks/useFetch.ts 数据交互封装</Button>
            <Button type="link">hooks/useMenus.ts 菜单控制</Button>
            <Button type="link">hooks/usePagination.ts 分页控制</Button>
            <Button type="link">hooks/useRules.ts 验证规则</Button>
            <Button type="link">hooks/useSystem.ts 系统配置</Button>
          </Space>
        </Typography.Paragraph>
      </Typography>
    </>
  );
};

export default Workbench;
