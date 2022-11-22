import { useState } from 'react'
import {BrowserRouter, Route, Routes, Outlet, useNavigate, Link} from 'react-router-dom';

import Auth from './pages/auth';
import './scss/app.scss';
import RouterList from './router/routerList';

function App() {
  return (
    <BrowserRouter>
        <div className='wrapper'>
          <div className='header'>
            <div className='header--item'><Link to="/organizations">Properties</Link></div>
            <div className='header--item'><Link to="/rooms">Rooms</Link></div>
          </div>
          <Routes>
            <Route  element={<Outlet />}>
              <Route path={'*'} element={<RouterList />} />
            </Route>
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
