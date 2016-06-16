import Component from 'react-pure-render/component'
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {
  FormattedHTMLMessage,
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape
} from 'react-intl'


import { Menu, MenuItem } from 'react-foundation-components/lib/menu'
// import {
//  Menu as FlexMenu,
//  MenuItem as FlexMenuItem,
// } from 'react-foundation-components/lib/menu-flex' // eslint-disable-line import/no-unresolved

import {
  OffCanvas,
  OffCanvasContent,
  OffCanvasContainer,
} from 'react-foundation-components/lib/off-canvas'
import {
  TitleBar,
  TitleBarItem,
  TitleBarTitle,
  TitleBarMenuIcon,
} from 'react-foundation-components/lib/title-bar'
// import {
//  TitleBar as FlexTitleBar,
//  TitleBarItem as FlexTitleBarItem,
//  TitleBarTitle as FlexTitleBarTitle,
//  TitleBarMenuIcon as FlexTitleBarMenuIcon,
// } from 'react-foundation-components/lib/title-bar-flex'
import { Row, Column } from 'react-foundation-components/lib/grid';
import {
  HideForScreenSize,
  ShowForScreenSize,
  ShowOnlyForScreenSize
} from 'react-foundation-components/lib/visibility';


import { asyncConnect } from 'redux-connect'

import * as adminActions from '../../common/admin/actions'
import adminMessages from '../../common/admin/adminMessages'
// import linksMessages from '../../common/app/linksMessages'

// import AdminWrapper from './AdminWrapper.react.js';

const messages = defineMessages({
  dashboard: {
    defaultMessage: 'Dashboard',
    id: 'admin.intro'
  },
  intro: {
    defaultMessage: `
      <p>Just the gosh darn best wines administration pages!</p>
    `,
    id: 'admin.intro'
  }
})

class AdminPage extends Component {

  static propTypes = {
    children: PropTypes.object,
    intl: intlShape.isRequired,
    open: PropTypes.string,
    tables: PropTypes.object.isRequired,
    toggleOffcanvas: PropTypes.func.isRequired
  };

  render() {
//    console.log('AdminPage this.props', this.props)
    const { children, intl, open, tables, toggleOffcanvas } = this.props
    const title = intl.formatMessage(adminMessages.title)

//    console.log('tables', tables.map.valueSeq().toJS());
// t a u  q s
    return (
      <Row className="admin-page">
        <Helmet title={title} />
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
          {children ||
          <FormattedHTMLMessage {...messages.intro} />
          }
        </Column>
        {/*
        <OffCanvasContainer className="admin-page" open={open}>
          <OffCanvas position="left" style={{ position: 'absolute' }}>
          </OffCanvas>

          <OffCanvasContent onContentBlockerClick={toggleOffcanvas}>
            <TitleBar>
              <TitleBarItem position="left">
                <HideForScreenSize
                  screenSize="xxlarge"
                  componentClass={TitleBarMenuIcon}
                  onClick={toggleOffcanvas}
                  open={open === null}
                />
                <TitleBarTitle>
                  <FormattedMessage {...adminMessages.title} />
                </TitleBarTitle>
              </TitleBarItem>
            </TitleBar>
            {children ||
              <FormattedHTMLMessage {...messages.intro} />
            }
          </OffCanvasContent>
        </OffCanvasContainer>
         */}
      </Row>
    )
  }

}

AdminPage = injectIntl(AdminPage)

export default asyncConnect([

  ],
  state => ({
    open: state.admin.open,
    tables: state.tables,
  }),
  adminActions

)(AdminPage)

//export default connect(state => ({
//  open: state.admin.open,
//  tables: state.formMeta.tables
//}), adminActions)(AdminPage)
