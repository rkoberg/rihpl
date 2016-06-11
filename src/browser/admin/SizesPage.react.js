
import Component from 'react-pure-render/component'
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl'
import { Table } from 'react-foundation-components/lib/table'

import Griddle from 'griddle-react'

const messages = defineMessages({
  title: {
    defaultMessage: 'Wine Sizes',
    id: 'admin.sizes.title'
  }
})

class SizesPage extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
    loading: PropTypes.bool.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    sizes: PropTypes.object.isRequired,
  };

  render() {
    console.log('SizesPage.render this.props', this.props.sizes.map.toList().toJS())
    const { intl, sizes } = this.props
    const title = intl.formatMessage(messages.title)

    return (
      <div className="admin-page wine-sizes-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...messages.title} />
        </h2>
        <Griddle results={sizes.map.toList().toJS()} />
        {/*
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grams</th>
            </tr>
          </thead>
          <tbody>
          {sizes.map.toList().map(size =>
          <tr key={size.id}>
            <td>{size.id}</td>
            <td>{size.name}</td>
            <td>{size.grams}</td>
          </tr>
          )}
          </tbody>
        </Table>
        */}
      </div>
    )
  }

}

SizesPage = injectIntl(SizesPage)

export default connect(state => ({
  loading: state.admin.loading,
  message: state.admin.message,
  sizes: state.sizes,
}))(SizesPage)
