
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Link } from 'react-router';
import { Button } from 'react-foundation-components/lib/button';

import { asyncConnect } from 'redux-connect';

import adminMessages from '../../../../common/admin/adminMessages';

import * as actions from '../common/actions';

import GridTable from '../../../tables/browser/GridTable.react';

class Table extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    params: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    regions: PropTypes.object.isRequired,
    sizes: PropTypes.object.isRequired,
    types: PropTypes.object.isRequired
  }

//  shouldComponentUpdate(nextProps, nextState) {
//    console.log('TableFormPage shouldComponentUpdate nextProps', nextProps);
//    console.log('TableFormPage shouldComponentUpdate nextState', nextState);
//    return !nextProps.table.bummer;
//  }

//  componentWillUnmount() {
//    console.log('TableFormPage componentWillUnmount this.props', this.props);
//  }

  render() {

    const { params, products, regions, sizes, types } = this.props;

//    const tableName = params.table;
    const table = this.props[actions.TABLE_NAME];

    const pathPrefix = `/admin/${actions.TABLE_NAME}/`;

    const gridTableOptions = { pathPrefix, products, regions, sizes, table, tableName: actions.TABLE_NAME, types };
    return (
      <div className="admin-page wine-sizes-page">
        <FormattedMessage {...adminMessages.products}>
          {message => <Helmet title={message} />}
        </FormattedMessage>
        <h2>
          <FormattedMessage {...adminMessages.products} />
          <Link className="button float-right" to={`${pathPrefix}new`}>New {actions.TABLE_NAME_SINGULAR}</Link>
        </h2>

        <GridTable {...gridTableOptions} />

      </div>
    );
  }

}

/*
 Here are the full set of properties on that options object passed in.

 store - commonly accessed props dispatch and getState
 params - the route params
 helpers
 matchContext
 router
 history
 location
 routes
 */
export default asyncConnect([
//    {
//      promise: ({ params, store }) => {
//        return store.dispatch(tablesActions.bootstrap(TABLE_NAME));
//      }
//    },
    {
      promise: ({ location, params, store }) => {
        console.log('TablePage asyncConnect location', location);
        console.log('TablePage asyncConnect params', params);
        const targetState = store.getState()[actions.TABLE_NAME];
        if (targetState.preloaded)
          return store.dispatch(actions.pageTable(targetState, Number(params.activePage), location.query));
        else
          return store.dispatch(actions.load(targetState, Number(params.activePage), location.query));
      }
    },
  ],
  (state, {location, params}) => {
    return {
      dispatch: state.dispatch,
      loading: state.admin.loading,
      message: state.admin.message,
      location,
      params,
      products: state.products,
      regions: state.regions,
      sizes: state.sizes,
      types: state.types,
    };
  },

)(Table);
