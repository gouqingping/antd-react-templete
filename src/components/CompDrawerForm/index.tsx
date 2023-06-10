import React, { useEffect, JSX } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DrawerForm, DrawerFormProps } from '@ant-design/pro-components';
import { useSafeState } from 'ahooks';
import { Popconfirm } from 'antd';
import { omit } from 'lodash';

function CompDrawerForm<T = Record<string, any>>(
  props: DrawerFormProps<T>,
): JSX.Element {
  const { onVisibleChange, visible } = props;

  const [showPopconFirm, setShowPopconFirm] = useSafeState(false);

  useEffect(() => {
    if (!visible) setShowPopconFirm(false);
  }, [setShowPopconFirm, visible]);

  const againClick = () => {
    onVisibleChange && onVisibleChange(false);
  };

  const renderExtraCloseIco = () => {
    if (showPopconFirm) {
      return (
        <Popconfirm
          onConfirm={againClick}
          placement="bottomLeft"
          title="您尚未提交，确认关闭吗？"
          okText="确定"
          cancelText="取消"
        >
          <CloseOutlined />
        </Popconfirm>
      );
    }
    return <CloseOutlined onClick={againClick} />;
  };
  const defaultProps = {
    closable: false,
    maskClosable: false,
    extra: renderExtraCloseIco(),
  };

  return (
    <DrawerForm
      onFieldsChange={(changedFields) => {
        changedFields.length > 0
          ? setShowPopconFirm(true)
          : setShowPopconFirm(false);
      }}
      {...omit({ ...props }, ['children', 'drawerProps'])}
      drawerProps={{
        ...defaultProps,
        ...props.drawerProps,
      }}
    >
      {props.children}
    </DrawerForm>
  );
}

export default CompDrawerForm;
