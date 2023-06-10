/**
 * header
 */
import React, { FC, ReactNode } from 'react';
import { useMenus } from '@/hooks/useMenus';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.module.less';

interface Props {
  renderProject?: ReactNode;
}

const RenderHeader: FC<Props> = ({ renderProject }: any) => {
  const { getMenus } = useMenus();
  const menuData: any = getMenus();

  const { pathname } = useLocation();
  const style = renderProject && renderProject.props.style;
  return (
    <div className="flex justify-between items-center">
      <div style={{ ...style }}> {renderProject && renderProject} </div>
      <Navbar routeData={menuData} selectPath={pathname} />
    </div>
  );
};

export default RenderHeader;
