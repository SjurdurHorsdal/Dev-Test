import {Navigate, Outlet, RouteProps} from 'react-router-dom';
import React from 'react';
import useStore, { Store } from '../../store/store';
//@ts-ignore
export interface IControlledRouteProps extends RouteProps {
  redirectPath?: string;
  children?: React.ReactElement;
}

const AdminRoute: React.FC<IControlledRouteProps> = 
  ({
    redirectPath = `/`,
    children,
  }) => {
    const verifyToken = useStore((state: Store) => state.verifyToken);
    const isValidToken = useStore((state: Store) => state.isValidToken);

    const currentToken = window.localStorage.getItem('token');

    React.useEffect(() => {
        verifyToken(currentToken || '')
    }, [isValidToken])

    if (!isValidToken) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  }


export default AdminRoute;
