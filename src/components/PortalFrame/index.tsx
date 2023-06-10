import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
export interface IPortalFrameProps {
  children?: ReactNode;
}

const PortalFrame: React.FC<IPortalFrameProps> = ({ children }) => {
  const element = useRef(document.getElementById('.portal'));
  useEffect(() => {
    return () => {
      if (element.current && element.current.childNodes.length === 0) {
        element.current.remove();
        element.current = null;
      }
    };
  }, []);
  if (!element.current) {
    element.current = document.createElement('div');
    element.current.classList.add('portal');
    document.body.appendChild(element.current);
  }
  return createPortal(
    <div className="portal-children">{children}</div>,
    element.current,
  );
};

export { PortalFrame };
