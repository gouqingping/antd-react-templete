import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import React from 'react';

const { Search } = Input;

type Props = SearchProps;

const TopSearchInput: React.FC<Props> = (props) => {
  return (
    <Search
      // @all 暂时隐去
      // addonBefore={'筛选内容'}
      placeholder="请输入"
      allowClear
      {...props}
    />
  );
  // return <Input prefix={<SearchOutlined/> } {...props} />
};

export default TopSearchInput;
