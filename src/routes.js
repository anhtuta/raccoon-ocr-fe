import React from 'react';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home />
  },
  {
    path: '/about',
    exact: false,
    main: () => <About />
  },
  {
    path: '',
    exact: false,
    main: () => <NotFound />
  }
];

export default routes;
