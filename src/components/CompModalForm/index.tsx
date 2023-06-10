import React, { useEffect, useRef, useState, JSX } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { ModalForm, ModalFormProps } from '@ant-design/pro-components';
import { useSafeState } from 'ahooks';
import { Popconfirm, Button } from 'antd';
import { omit } from 'lodash';
import { LoadingOutlined } from '@ant-design/icons';

interface PropsInter extends ModalFormProps<Record<string, any>> {
  formRef: any;
}
function CompModalForm(props: PropsInter): JSX.Element {
  const { onOpenChange, open, formRef } = props;
  const [showPopconFirm, setShowPopconFirm] = useSafeState(false);
  const [load, setLoad] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = formRef || useRef();
  useEffect(() => {
    if (!open) {
      setShowPopconFirm(false);
      setLoad(false);
    }
  }, [setShowPopconFirm, open]);

  const againClick = () => {
    onOpenChange && onOpenChange(false);
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
    <ModalForm
      submitter={{
        render: ({ form }: { [k: string]: any }) => {
          ref.current = {
            ...form,
            setLoadState: setLoad,
          };
          return [
            <Button
              key="rest"
              disabled={load}
              onClick={() => !load && onOpenChange?.(false)}
            >
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              disabled={load}
              icon={load ? <LoadingOutlined /> : ''}
              onClick={() => {
                form?.validateFields?.().then(() => {
                  !load && form?.submit?.();
                  setLoad(true);
                });
              }}
            >
              提交
            </Button>,
          ];
        },
      }}
      onFieldsChange={(changedFields) => {
        changedFields.length > 0
          ? setShowPopconFirm(true)
          : setShowPopconFirm(false);
      }}
      {...omit({ visible: props.open, onVisibleChange: props.onOpenChange,...props }, ['children', 'modalProps'])}
      modalProps={{
        ...defaultProps,
        ...props.modalProps,
      }}
    >
      {props.children}
    </ModalForm>
  );
}

export default CompModalForm;
