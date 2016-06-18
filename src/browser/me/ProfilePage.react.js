import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { asyncConnect } from 'redux-connect';

const messages = defineMessages({
  title: {
    defaultMessage: 'Profile',
    id: 'me.profilePage.title'
  }
});

class ProfilePage extends Component {

  static propTypes = {
    foo: PropTypes.bool.isRequired,
  };

  render() {
    const {foo} = this.props;
    return (
      <div className="profile-page">
        <FormattedMessage {...messages.title}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <p>
          <FormattedMessage {...messages.title} />
        </p>
        <p>foo: {foo}</p>
      </div>
    );
  }

}

export default asyncConnect([
  ],
  state => {
    
    return {
      foo: state.admin.loading,
    };
  },

)(ProfilePage);
