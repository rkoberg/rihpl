
import Component from 'react-pure-render/component'
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl'
import { Table } from 'react-foundation-components/lib/table'

const messages = defineMessages({
  title: {
    defaultMessage: 'Wine Types',
    id: 'admin.types.title'
  }
})

class WineTypesPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    loading: PropTypes.bool.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    types: PropTypes.object.isRequired,
  };

  render() {
//    console.log('WineTypesPage.render this.props',  this.props);
    const { intl, types } = this.props
    const title = intl.formatMessage(messages.title)

    return (
      <div className="admin-page wine-types-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...messages.title} />
        </h2>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
          {types.map.toList().map(type =>
          <tr key={type.id}>
            <td>{type.id}</td>
            <td>{type.name}</td>
          </tr>
          )}
          </tbody>
        </Table>
      </div>
    )
  }

}

WineTypesPage = injectIntl(WineTypesPage)

export default connect(state => ({
  loading: state.admin.loading,
  message: state.admin.message,
  types: state.types,
}))(WineTypesPage)
