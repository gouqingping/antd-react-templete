import { ProTable, ProTableProps } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function TableCon<RecordType extends Record<string, any>>(props: any) {
  // 组件加载 初始化 默认全局配置属性
  let defaultProps: ProTableProps<any, any> | null = {
    search: false,
    // polling: 5000,
    toolBarRender: false,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultPageSize: 10,
      defaultCurrent: 1,
    },
    sticky: props?.stickyPayload
      ? props.stickyPayload
      : { offsetHeader: -22.7 },
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const defaultPolling = 'polling' in props ? props.polling : 5000;

  const [polling, setPolling] = useState(defaultPolling);

  useEffect(() => {
    return () => {
      // 组件卸载 清除所有属性
      // eslint-disable-next-line react-hooks/exhaustive-deps
      defaultProps = null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      props = null;
    };
  }, []);

  return (
    <ProTable<RecordType>
      {...defaultProps}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: 10,
        defaultCurrent: 1,
        size: 'default',
        current: page ? Number(page) : 1,
        pageSize: pageSize ? Number(pageSize) : 10,
        showTotal(total) {
          return `共 ${total} 条记录`;
        },
      }}
      {...props}
      request={async (params) => {
        if (!props?.request) return [];
        // 表格return stopPolling 即可根据后端状态关闭轮训
        const data = await props.request(params);
        if (data.stopPolling) {
          setPolling(undefined);
        } else {
          setPolling(defaultPolling);
        }
        return data;
      }}
      polling={polling}
      onChange={(pageInfo: any) => {
        const params: any = {};
        for (const key of searchParams.keys()) {
          params[key] = searchParams.get(key);
        }
        setSearchParams({
          ...params,
          page: pageInfo.current.toString(),
          pageSize: pageInfo.pageSize.toString(),
        });
        props.onChange?.(pageInfo);
      }}
    />
  );
}

export default TableCon;
