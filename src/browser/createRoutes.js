import App from './app/App.react'
import Auth from './auth/AuthPage.react'
import Fields from './fields/FieldsPage.react'
import Home from './home/HomePage.react'
import Intl from './intl/IntlPage.react'
import Me from './me/MePage.react'
import NotFound from './notfound/NotFoundPage.react'
import Profile from './me/ProfilePage.react'
import React from 'react'
import Settings from './me/SettingsPage.react'
import Todos from './todos/TodosPage.react'
import { IndexRoute, Route } from 'react-router'

import AdminPage from './admin/AdminPage.react.js'
import AdminTablePage from './admin/TablePage.react'

export default function createRoutes(getState) {
  const requireAuth = (nextState, replace) => {
    // Note how we can read anything from the global app state safely, because
    // the app state is an immutable value.
    const loggedInUser = getState().users.viewer
    if (!loggedInUser) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  const goToPageOne = (nextState, replace) => {
    replace({
      pathname: `${nextState.location.pathname}/1`,
    })
  }

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Auth} path="login" />
      <Route component={Intl} path="intl" />
      <Route component={Fields} path="fields" />
      <Route component={Me} onEnter={requireAuth} path="me">
        <Route component={Profile} path="profile" />
        <Route component={Settings} path="settings" />
      </Route>
      <Route component={Todos} path="todos" />


      <Route component={AdminPage} path="admin">
        <Route component={AdminTablePage} path="tables/:table/:activePage" />
      </Route>


      <Route component={NotFound} path="*" />
    </Route>
  )
}
