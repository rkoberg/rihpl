import React from 'react'
import ReactDOM from 'react-dom'
import configureReporting from '../common/configureReporting'
import configureStore from '../common/configureStore'
import createEngine from 'redux-storage-engine-localstorage'
import createRoutes from './createRoutes'
import useScroll from 'react-router-scroll'
import { Provider } from 'react-redux'
import { Router, applyRouterMiddleware, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'

import { ReduxAsyncConnect } from 'redux-connect'

const initialState = window.__INITIAL_STATE__
const reportingMiddleware = configureReporting({
  appVersion: initialState.config.appVersion,
  // sentryUrl: initialState.config.sentryUrl,
  unhandledRejection: fn => window.addEventListener('unhandledrejection', fn)
})
const store = configureStore({
  initialState,
  platformDeps: { createEngine },
  platformMiddleware: [reportingMiddleware, routerMiddleware(browserHistory)],//
})
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(store.getState)

// const scrollTop = () => {
//   console.log('scroll to top....')
//   document.body.scrollTop = document.documentElement.scrollTop = 0
//   console.log('scroll to top document.body.scrollTop', document.body.scrollTop)
//   console.log('scroll to top document.documentElement.scrollTop', document.documentElement.scrollTop)
// }
// onUpdate={scrollTop}

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      render={(props) => (
        <ReduxAsyncConnect
          {...props}
          render={applyRouterMiddleware(useScroll())}
        />
      )}
    >
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
)
