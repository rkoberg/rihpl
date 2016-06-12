
import Component from 'react-pure-render/component'
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl'
import { Table } from 'react-foundation-components/lib/table'

import Griddle from 'griddle-react'

import { asyncConnect } from 'redux-connect'

import * as adminActions from '../../common/admin/actions'
import adminMessages from '../../common/admin/adminMessages'

//const messages = defineMessages({
//  title: {
//    defaultMessage: 'Wine Sizes',
//    id: 'admin.sizes.title'
//  }
//})

class TablePage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    loading: PropTypes.bool.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    rows: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
  };

  render() {
    console.log('TablePage.render this.props', this.props)
    const { intl, rows, tableName } = this.props
    const title = intl.formatMessage(adminMessages[tableName])

    return (
      <div className="admin-page wine-sizes-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...adminMessages[tableName]} />
        </h2>
        {rows &&
        <Griddle
          initialSort="name"
          //          metadataColumns={['id', 'parent_id']}
          results={rows.map.toList().toJS()}
          resultsPerPage={20}
          showFilter
          showSettings
          tableClassName="griddle-table"
          useFixedHeader={true}
          useGriddleStyles={false}
        />
        }
        {/*
         <Table>
         <thead>
         <tr>
         <th>ID</th>
         <th>Level</th>
         <th>Name</th>
         <th>Parent</th>
         </tr>
         </thead>
         <tbody>
         {regions.map.toList().map(region =>
         <tr key={region.id}>
         <td>{region.id}</td>
         <td>{region.level}</td>
         <td>{region.name}</td>
         <td>{region.parent_id}</td>
         </tr>
         )}
         </tbody>
         </Table>
         */}
      </div>
    )
  }

}

TablePage = injectIntl(TablePage)

export default asyncConnect([
    {
      promise: ({ store }) => store.dispatch(adminActions.bootstrap(store)),
    },
  ],
  state => {
//    console.log('TablePage asyncConnect state', state);
    const pathname = state.routing.locationBeforeTransitions.pathname
    const tableName = pathname.split('/').pop();
    return {
      loading: state.admin.loading,
      message: state.admin.message,
      rows: state[tableName],
      meta: state.app[tableName],
      tableName: tableName
    }
  },

  adminActions

)(TablePage)

//export default connect(state => ({
//  loading: state.admin.loading,
//  message: state.admin.message,
//  sizes: state.sizes,
//}))(SizesPage)
