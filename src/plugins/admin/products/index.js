
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Form from './browser/Form.react';
import Table from './browser/Table.react';

export default (
  <Route path="products">
    <Route component={Form} path="new" />
    <Route component={Form} path="edit/:id" />
    <Route component={Table} path=":activePage" />
  </Route>
);
