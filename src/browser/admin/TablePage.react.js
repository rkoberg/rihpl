
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Link } from 'react-router';
import { asyncConnect } from 'redux-connect';
import { Button } from 'react-foundation-components/lib/button';

import * as tablesActions from '../../common/tables/actions';
import adminMessages from '../../common/admin/adminMessages';

import GridFilter from './GridFilter.react';
import GridTable from './GridTable.react';

import {getTableNameFromLocation} from '../../common/tables/model'

class TablePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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

//  shouldComponentUpdate(nextProps, nextState) {
//    if (!this.props.tableName)
//      return false;
//    return true;
//  }

  render() {

    const { table, tableName, regions, sizes, types } = this.props;
    const pathPrefix = `/admin/tables/${tableName}/`;

    const gridFilterOptions = { pathPrefix, table, tableName, regions, sizes, types };
    const gridTableOptions = { pathPrefix, table, tableName, regions, sizes, types };
    return (
      <div className="admin-page wine-sizes-page">
        <FormattedMessage {...adminMessages[tableName]}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <h2>
          <FormattedMessage {...adminMessages[tableName]} />
          <Link className="button float-right" to={`${pathPrefix}new`}>New <FormattedMessage {...adminMessages[`${tableName}Singular`]} /></Link>
        </h2>

        <GridFilter {...gridFilterOptions} />
        <GridTable {...gridTableOptions} />

      </div>
    );
  }

}

export default asyncConnect([
    {
      promise: ({ store }) => {
        const tableName = getTableNameFromLocation(store.getState().routing.locationBeforeTransitions);
        return store.dispatch(tablesActions.bootstrap(tableName));
      }
    },
    {
      promise: ({ store }) => {
        const loc = store.getState().routing.locationBeforeTransitions;
        const tableName = getTableNameFromLocation(loc);
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
    const tableName = getTableNameFromLocation(state.routing.locationBeforeTransitions);
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
