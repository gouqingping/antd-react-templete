import React from 'react';

interface Props {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

const TopOperationBar: React.FC<Props> = (props) => {
  const { leftContent, rightContent } = props;

  return (
    <div className="flex items-center justify-between">
      <>
        {leftContent}
        {rightContent}
      </>
    </div>
  );
};

export default TopOperationBar;
