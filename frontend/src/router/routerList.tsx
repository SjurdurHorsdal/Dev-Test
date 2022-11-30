import {Route, Routes, Outlet, useLocation, useNavigate} from 'react-router-dom';
import React from 'react';
import Auth from '../pages/auth';
import AdminRoute from './components/AdminRoute';
import OrganizationsPage from '../pages/organizations';
import RoomsPage from '../pages/rooms';
import { useAuth } from '../hooks/useAuth';


const RouterList: React.FC = () => {
    const auth = useAuth();

    return (
        <Routes>
            <Route path={``} element={<Auth />}>
                
            </Route>
            <Route element={<AdminRoute isValidToken={auth} />}>
                <Route path={'/organizations'} element={<OrganizationsPage />} />
                <Route path={'/rooms'} element={<RoomsPage />} />
            </Route>
        </Routes>
    );
};

export default RouterList;