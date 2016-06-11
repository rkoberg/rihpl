
import Component from 'react-pure-render/component'
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl'
import { Table } from 'react-foundation-components/lib/table'

import Griddle from 'griddle-react'

const messages = defineMessages({
  title: {
    defaultMessage: 'Wine Regions',
    id: 'admin.regions.title'
  }
})

class RegionsPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    loading: PropTypes.bool.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    regions: PropTypes.object.isRequired,
  };

  render() {
    // console.log('RegionsPage.render this.props',  this.props);
    const { intl, regions } = this.props
    const title = intl.formatMessage(messages.title)

    return (
      <div className="admin-page wine-regions-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...messages.title} />
        </h2>

        <Griddle
          initialSort="name"
          metadataColumns={['id', 'parent_id']}
          results={regions.map.toList().toJS()}
          resultsPerPage={20}
          showFilter
          showSettings
          tableClassName="griddle-table"
          useFixedHeader
        />
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

RegionsPage = injectIntl(RegionsPage)

export default connect(state => ({
  loading: state.admin.loading,
  message: state.admin.message,
  regions: state.regions,
}))(RegionsPage)
