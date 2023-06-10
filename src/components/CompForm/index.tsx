import React, { JSX, Fragment } from 'react';
import { is } from '@/utils/globleHandle';
import * as ProComponents from '@ant-design/pro-components';
import { Space } from 'antd';
import styles from './index.module.less';

interface Props {
  items: Array<Node>;
}

export interface Node {
  type: string;
  props: any;
  isShow?: boolean;
  notes?: string;
  component?: JSX.Element;
  addonAfter?: JSX.Element;
  addonBefore?: JSX.Element;
}

const SpaceMain = ({ children, ...item }: { children?: JSX.Element, [k:string]:any }) => {
  const { addonAfter, addonBefore } = item;
  const isAddon = !!(addonAfter || addonBefore) 
  if (isAddon) return (
    <Space className={styles.fromSpace}>
      <div>{addonAfter || <Fragment />}</div>
      {children || <Fragment />}
      <div>{addonBefore || <Fragment />}</div>
    </Space>
  );
  return <>{children}</>
}

function CompForm(props: Props) {
  const { items } = props;
  const renderChildren = (item: Node, index: number) => {
    const isShow = is.undefined(item.isShow) || item.isShow;
    if (item.type === 'Component') return (
      <SpaceMain key={index} {...item}>
        {isShow && item.component ? item.component : <Fragment />}
      </SpaceMain>
    );
    const CurrentComponent = (ProComponents as any)[item.type];
    if (CurrentComponent) return (
      <SpaceMain key={index} {...item}>
        {isShow ? <CurrentComponent {...item.props} /> : <Fragment />}
      </SpaceMain>
    );
    return <SpaceMain key={index} {...item}><Fragment/></SpaceMain>;
  };
  return (
    <Fragment>
      {items.map((item: Node, index: number) => renderChildren(item, index))}
    </Fragment>
  );
}

export default CompForm;
