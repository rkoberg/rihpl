
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import AdminPage from './AdminPage.react';
import productRoutes from './products';


export const routes = (basePath = 'admin') => (

  <Route component={AdminPage} path={basePath}>
    {productRoutes}
  </Route>
);
