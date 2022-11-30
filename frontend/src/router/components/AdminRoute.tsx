import {Navigate, Outlet, RouteProps} from 'react-router-dom';
import React from 'react';
import useStore, { Store } from '../../store/store';
//@ts-ignore
export interface IControlledRouteProps extends RouteProps {
  isValidToken: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}

const AdminRoute: React.FC<IControlledRouteProps> = 
  ({
    isValidToken,
    redirectPath = `/`,
    children,
  }) => {
    if (!isValidToken) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  }


export default AdminRoute;
