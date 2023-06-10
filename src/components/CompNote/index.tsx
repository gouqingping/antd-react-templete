/**
 * 备注
 */
import React, { FC } from 'react';
import { ProFormTextArea } from '@ant-design/pro-components';

interface Props {
  label?: string;
  disabled?: boolean;
  [propsName: string]: any;
}

const CompNote: FC<Props> = (props) => {
  return (
    <ProFormTextArea
      name="note"
      label="备注"
      rules={[
        {
          max: 100,
          message: '长度不超过100位',
        },
      ]}
      placeholder="请输入"
      fieldProps={{
        maxLength: 100,
        showCount: true,
      }}
      {...props}
    />
  );
};

export default CompNote;
