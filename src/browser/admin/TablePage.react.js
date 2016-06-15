
import Component from 'react-pure-render/component'
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl'

//import Griddle from 'griddle-react'

import { asyncConnect } from 'redux-connect'

import * as tablesActions from '../../common/tables/actions'
import adminMessages from '../../common/admin/adminMessages'

import GridTable from './GridTable.react'

class TablePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    loading: PropTypes.bool.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    pageTable: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const {dispatch, location, pageTable, tableName} = this.props
    const activePage = parseInt(location.pathname.split('/').pop(), 10)
    console.log('GridTable onPaginationClick activePage', activePage)
    dispatch(pageTable(tableName, activePage))
  }

  render() {
    console.log('TablePage this.props', this.props)
    const { dispatch, history, intl, location, pageTable, table, tableName } = this.props
    const title = intl.formatMessage(adminMessages[tableName])

    const gridTableOptions = {
      dispatch, history, location, pageTable, table, tableName
    }
    return (
      <div className="admin-page wine-sizes-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...adminMessages[tableName]} />
        </h2>

        <GridTable {...gridTableOptions}/>

      </div>
    )
  }

}

TablePage = injectIntl(TablePage)

const getTableName = state => {
//  console.log('asyncConnect getTableName state', state);
  const pathname = state.routing.locationBeforeTransitions.pathname
  const pathArr = pathname.split('/')
  return pathArr[pathArr.length - 2];
}

export default asyncConnect([
    {
      promise: ({ store }) => {
        const tableName = getTableName(store.getState())
        return store.dispatch(tablesActions.bootstrap(tableName))
      }
    },
    {
      promise: ({ store }) => {
        const tableName = getTableName(store.getState())
        const targetState = store.getState()[tableName]
        if (!targetState.preloaded)
          return store.dispatch(tablesActions.load(tableName, targetState))
        else
          return true
      }
    },
  ],
  state => {
    const tableName = getTableName(state)
//    console.log('asyncConnect tableName', tableName)
    return {
      loading: state.admin.loading,
      message: state.admin.message,
      pageTable: tablesActions.pageTable,
      table: state[tableName],
      tableName: tableName,
    }
  },

)(TablePage)
