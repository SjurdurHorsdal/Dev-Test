import {BrowserRouter, Route, Routes, Outlet, Link} from 'react-router-dom';

import './scss/app.scss';
import RouterList from './router/routerList';
import Header from './components/header';

function App() {
  return (
    <BrowserRouter>
        <div className='wrapper'>
          <Header />
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
