import React from 'react';
import { Spin } from 'antd';
import { omit } from '@/utils/globleHandle';

const CompLoading = (props: { children: any; loading: any }) => {
  const { children, loading } = props;
  const defaultProps = {
    spinning: loading,
    delay: 300,
  };

  return (
    <Spin {...omit({ ...defaultProps, ...props }, ['children', 'loading'])}>
      {children}
    </Spin>
  );
};

export default CompLoading;
