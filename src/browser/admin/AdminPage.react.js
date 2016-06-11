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
import { HideForScreenSize } from 'react-foundation-components/lib/visibility'

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
    const { children, intl, open, tables, toggleOffcanvas } = this.props
    const title = intl.formatMessage(adminMessages.title)

    return (
      <div className="admin-page">
        <Helmet title={title} />
        <OffCanvasContainer className="admin-page" open={open}>
          <OffCanvas position="left" style={{ position: 'absolute' }}>
            <Menu vertical>
              <MenuItem>
                <Link activeClassName="active" to="/admin">
                  <h3><FormattedMessage {...messages.dashboard} /></h3>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link activeClassName="active" to="/admin/regions">
                  <FormattedMessage {...adminMessages.regions} />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link activeClassName="active" to="/admin/sizes">
                  <FormattedMessage {...adminMessages.sizes} />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link activeClassName="active" to="/admin/types">
                  <FormattedMessage {...adminMessages.types} />
                </Link>
              </MenuItem>
            </Menu>
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
      </div>
    )
  }

}

AdminPage = injectIntl(AdminPage)

export default connect(state => ({
  open: state.admin.open,
  tables: state.formMeta.tables
}), adminActions)(AdminPage)
