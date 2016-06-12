import '../styles/main.scss'

import Component from 'react-pure-render/component'

import Immutable from 'immutable'

// import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-connect'

import Footer from './Footer.react'
import Header from './Header.react'
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'
import favicon from '../../common/app/favicon'
import start from '../../common/app/start'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { locationShape } from 'react-router'

import { Row, Column } from 'react-foundation-components/lib/grid';
import { ShowForScreenSize, ShowOnlyForScreenSize } from 'react-foundation-components/lib/visibility';

import { asyncConnect } from 'redux-connect'

import * as AppActionCreators from '../../common/app/actions'
// import Size from '../../server/model/sizes'

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge'
  }
]

class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    currentLocale: PropTypes.string.isRequired,
    location: locationShape
  };

  render() { // .app.sizes.toJS()
    const { children, currentLocale, location } = this.props

    return (
      <div className="container">
        <Helmet
          htmlAttributes={{ lang: currentLocale }}
          titleTemplate="%s - rihpl"
          meta={[
            ...bootstrap4Metas,
            {
              name: 'description',
              content: 'Dev stack and starter kit for functional and universal React apps'
            },
            ...favicon.meta
          ]}
          link={[
            ...favicon.link
          ]}
        />
        {/* Pass location to ensure header active links are updated. */}
        <Header location={location} />
        <Row className="wrapper-row">
          <Column>
            {children}
          </Column>
        </Row>
        <Footer />
      </div>
    )
  }

}

App = start(App)

export default asyncConnect([
  {
    promise: ({ store }) => store.dispatch(AppActionCreators.initLoad('sizes')),
  },
  {
    promise: ({ store }) => store.dispatch(AppActionCreators.initLoad('types')),
  },
  {
    promise: ({ store }) => store.dispatch(AppActionCreators.initLoad('regions')),
  },
],
  state => ({
    currentLocale: state.intl.currentLocale,
    sizes: state.sizes
  })

)(App)
