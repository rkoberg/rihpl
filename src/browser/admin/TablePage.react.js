
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

import { asyncConnect } from 'redux-connect';
import { Button } from 'react-foundation-components/lib/button';

import * as tablesActions from '../../common/tables/actions';
import adminMessages from '../../common/admin/adminMessages';

import GridFilter from './GridFilter.react';
import GridTable from './GridTable.react';

class TablePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    loading: PropTypes.bool.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    pageTable: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
    regions: PropTypes.object.isRequired,
    sizes: PropTypes.object.isRequired,
    types: PropTypes.object.isRequired
  }

  render() {
    const { intl, table, tableName, regions, sizes, types } = this.props;
    const title = intl.formatMessage(adminMessages[tableName]);

    const gridFilterOptions = { table, tableName, regions, sizes, types };
    const gridTableOptions = { table, tableName, regions, sizes, types };
    return (
      <div className="admin-page wine-sizes-page">
        <Helmet title={title} />
        <h2>
          <FormattedMessage {...adminMessages[tableName]} />
          <Button className="float-right">New {title}</Button>
        </h2>

        <GridFilter {...gridFilterOptions} />
        <GridTable {...gridTableOptions} />

      </div>
    );
  }

}

TablePage = injectIntl(TablePage);

const getTableName = state => {
  const pathname = state.routing.locationBeforeTransitions.pathname;
  const pathArr = pathname.split('/');
  return pathArr[pathArr.length - 2];
};

export default asyncConnect([
  {
    promise: ({ store }) => {
      const tableName = getTableName(store.getState());
      return store.dispatch(tablesActions.bootstrap(tableName));
    }
  },
  {
    promise: ({ store }) => {
      const tableName = getTableName(store.getState());
      const loc = store.getState().routing.locationBeforeTransitions;
      const activePage = parseInt(
          loc.pathname.split('/').pop(), 10
        );
      const targetState = store.getState()[tableName];
      if (!targetState.preloaded)
        return store.dispatch(tablesActions.load(tableName, targetState, activePage, loc.query));
      else
          return store.dispatch(tablesActions.pageTable(tableName, targetState, activePage, loc.query));
    }
  },
],
  state => {
    const tableName = getTableName(state);
    return {
      loading: state.admin.loading,
      message: state.admin.message,
      pageTable: tablesActions.pageTable,
      table: state[tableName],
      tableName: tableName,

      regions: state.regions,
      sizes: state.sizes,
      types: state.types,
    };
  },

)(TablePage);
