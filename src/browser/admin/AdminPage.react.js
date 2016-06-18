import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  FormattedHTMLMessage,
  FormattedMessage,
  defineMessages,
} from 'react-intl';


import { Menu, MenuItem } from 'react-foundation-components/lib/menu';
import { Row, Column } from 'react-foundation-components/lib/grid';

import { asyncConnect } from 'redux-connect';

//import * as adminActions from '../../common/admin/actions';
import adminMessages from '../../common/admin/adminMessages';
// import linksMessages from '../../common/app/linksMessages'

const messages = defineMessages({
  dashboard: {
    defaultMessage: 'Dashboard',
    id: 'app.admin.dashboard'
  },
  intro: {
    defaultMessage: `
      <p>Just the gosh darn best wines administration pages!</p>
    `,
    id: 'app.admin.intro'
  }
});

class AdminPage extends Component {

  static propTypes = {
    children: PropTypes.object,
    open: PropTypes.string,
    tables: PropTypes.object.isRequired,
  };

  render() {
    const { children, open, tables } = this.props;

    const mainCol = children ? children : <FormattedHTMLMessage {...messages.intro} />;

    return (
      <Row className="admin-page">
        <FormattedMessage {...adminMessages.title}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <Column small={12} medium={12} large={2} xlarge={2} xxlarge={2}>
          <Menu vertical>
            <MenuItem>
              <Link activeClassName="active" to="/admin">
                <h4><FormattedMessage {...messages.dashboard} /></h4>
              </Link>
            </MenuItem>
            {tables.map.valueSeq().map(table => adminMessages[table.name] && (
            <MenuItem key={table.name}>
              <Link activeClassName="active" to={`/admin/tables/${table.name}/1`}>
                <FormattedMessage {...adminMessages[table.name]} />
              </Link>
            </MenuItem>
            ))}
          </Menu>
        </Column>
        <Column small={12} medium={12} large={10} xlarge={10} xxlarge={10}>
          {mainCol}
        </Column>
      </Row>
    );
  }

}
//
//export default asyncConnect([
//
//],
//  state => ({
//    open: state.admin.open,
//    tables: state.tables,
//  }),
//  adminActions
//
//)(AdminPage);

export default connect(state => ({
  open: state.admin.open,
  tables: state.tables
}))(AdminPage)
