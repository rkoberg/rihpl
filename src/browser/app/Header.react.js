import Component from 'react-pure-render/component'
import React, { PropTypes } from 'react'
import linksMessages from '../../common/app/linksMessages'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { TopBar, TopBarContent, TopBarItem, TopBarTitle } from 'react-foundation-components/lib/top-bar';
import {
  TopBar as FlexTopBar,
  TopBarContent as FlexTopBarContent,
  TopBarItem as FlexTopBarItem,
  TopBarTitle as FlexTopBarTitle,
} from 'react-foundation-components/lib/top-bar-flex'; // eslint-disable-line import/no-unresolved
import { Menu, MenuItem } from 'react-foundation-components/lib/menu';
import {
  Menu as FlexMenu,
  MenuItem as FlexMenuItem,
} from 'react-foundation-components/lib/menu-flex'; // eslint-disable-line import/no-unresolved
import { Button } from 'react-foundation-components/lib/button';
import { MenuIcon } from 'react-foundation-components/lib/menu-icon';
import { ShowForScreenSize, HideForScreenSize } from 'react-foundation-components/lib/visibility';

class Header extends Component {

  static propTypes = {
    viewer: PropTypes.object
  };

  render() {
    const { viewer } = this.props

    return (
      <header>
        <TopBar>
          <TopBarTitle>
            <Menu>
              <MenuItem text>
                <Link to="/">
                  <FormattedMessage {...linksMessages.home} />
                </Link>
              </MenuItem>
            </Menu>
          </TopBarTitle>
          <TopBarContent>
            <TopBarItem position="left">
              <Menu>
                <MenuItem>
                  <Link activeClassName="active" to="/todos">
                    <FormattedMessage {...linksMessages.todos} />
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link activeClassName="active" to="/intl">
                    <FormattedMessage {...linksMessages.intl} />
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link activeClassName="active" to="/me">
                    <FormattedMessage {...linksMessages.me} />
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link activeClassName="active" to="/admin">
                    <FormattedMessage {...linksMessages.admin} />
                  </Link>
                </MenuItem>
                {!viewer &&
                <MenuItem>
                  <Link activeClassName="active" to="/login">
                    <FormattedMessage {...linksMessages.login} />
                  </Link>
                </MenuItem>
                }
              </Menu>
            </TopBarItem>
            <TopBarItem position="right">
              <Menu>
                <MenuItem><input type="search" placeholder="Search" /></MenuItem>
                <MenuItem><Button>Search</Button></MenuItem>
              </Menu>
            </TopBarItem>
          </TopBarContent>
        </TopBar>

      </header>
    )
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}))(Header)
