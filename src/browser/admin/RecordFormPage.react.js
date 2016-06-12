
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

class RecordFormPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    loading: PropTypes.bool.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    rows: PropTypes.object.isRequired,
  };

  render() {
    console.log('RecordFormPage.render this.props', this.props)
    const { intl, rows } = this.props
    const title = intl.formatMessage(messages.title)

    return (
      <div className="admin-page wine-sizes-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...messages.title} />
        </h2>
        <Griddle
          initialSort="name"
//          metadataColumns={['id', 'parent_id']}
          results={rows.map.toList().toJS()}
          resultsPerPage={20}
          showFilter
          showSettings
          tableClassName="griddle-table"
          useFixedHeader={true}
        />
      </div>
    )
  }

}

RecordFormPage = injectIntl(RecordFormPage)

export default asyncConnect([
    {
      promise: ({ store }) => store.dispatch(adminActions.bootstrap(store)),
    },
  ],
  state => {
//    console.log('RecordFormPage asyncConnect state', state);
    const pathname = state.routing.locationBeforeTransitions.pathname
    const tableName = pathname.split('/').pop();
    return {
      loading: state.admin.loading,
      message: state.admin.message,
      rows: state[tableName],
      meta: state.app[tableName],
    }
  },

  adminActions

)(RecordFormPage)

//export default connect(state => ({
//  loading: state.admin.loading,
//  message: state.admin.message,
//  sizes: state.sizes,
//}))(SizesPage)
