
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';
import { asyncConnect } from 'redux-connect';

import * as tablesActions from '../../common/tables/actions';
import * as adminActions from '../../common/admin/actions';
import adminMessages from '../../common/admin/adminMessages';

import DynamicTableForm from './DynamicTableForm.react';

import {getActionFromLocation, getIdFromLocation, getTableNameFromLocation} from '../../common/tables/model'


const excludedFields = ['id', 'created_at', 'updated_at'];

// const messages = defineMessages({
//  title: {
//    defaultMessage: 'Wine Sizes',
//    id: 'admin.sizes.title'
//  }
// })

class TableFormPage extends Component {

  static propTypes = {
//    loading: PropTypes.bool.isRequired,
//    message: React.PropTypes.oneOfType([
//      React.PropTypes.string,
//      React.PropTypes.bool,
//    ]).isRequired,
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,

    regions: PropTypes.object.isRequired,
    sizes: PropTypes.object.isRequired,
    types: PropTypes.object.isRequired,
  };

  render() {

    const { regions, sizes, types, table, tableName } = this.props;

    const formActionType = getActionFromLocation(this.props.location);

    const itemTypeName = <FormattedMessage {...adminMessages[`${tableName}Singular`]} />;


    const fields = table.meta.columns.map(col => col.name);
    const editableItemId = getIdFromLocation(this.props.location);

    const editableItem = editableItemId === null ? {} : table.map.get(editableItemId).toJS();

//    <FormFieldHelp>Uncontrolled Text Help</FormFieldHelp>

    const onSubmit = (formVals) => {
      console.log('TableFormPage onSubmit formVals', formVals);
    }

    const formProps = {
      editableItem,
      fields: fields.filter(field => !excludedFields.includes(field)).toJS(),
      onSubmit,
      table,
      tableName,

      regions,
      sizes,
      types,
    };

    const formTitle = formActionType === 'new' ? `Create new {itemTypeName}` : `Edit `

    return (
      <div className="admin-page record-form-page">
        <h2>{formActionType === 'new' ? 'Create' : 'Edit'} new </h2>

        <DynamicTableForm {...formProps}/>
      </div>
    );
  }

}

//export default TableFormPage;
//
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
        const id = getIdFromLocation(loc);
        return store.dispatch(tablesActions.getById(tableName, id));
      }
    },
  ],
  state => {
    const tableName = getTableNameFromLocation(state.routing.locationBeforeTransitions);

    return {
//     loading: state.admin.loading,
//     message: state.admin.message,
      table: state[tableName],
      tableName: tableName,

      regions: state.regions,
      sizes: state.sizes,
      types: state.types,
    };
  },

  adminActions

)(TableFormPage);
