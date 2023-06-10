/**
 *
 *  结果页面
 */
import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function ResultPage() {
  const navigate = useNavigate();
  const linkTo = () => navigate('/');
  return (
    <Result
      status="404"
      title="404"
      subTitle="您当前访问的页面不存在"
      extra={
        <Button type="primary" onClick={linkTo}>
          跳转项目首页
        </Button>
      }
    />
  );
}

export default ResultPage;
