/**
 * 页面 loading
 */
import React from 'react';
import { Spin } from 'antd';
import './index.css';
function pageLoading() {
  return (
    <div className="loading">
      <Spin size="large" tip="加载中...">
        <div style={{ padding: 50 }}></div>
      </Spin>
    </div>
  );
}

export default pageLoading;
