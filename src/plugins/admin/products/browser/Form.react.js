
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';
import { asyncConnect } from 'redux-connect';

import Immutable from 'immutable';

import * as actions from '../common/actions';

import DynamicForm from '../../../forms/DynamicForm.react';

class Form extends Component {

// tablesActions.
//  createOrUpdate
//  getById
//  bootstrap

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    message: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]).isRequired,
    params: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    regions: PropTypes.object.isRequired,
    sizes: PropTypes.object.isRequired,
    types: PropTypes.object.isRequired
  };

  render() {

    const { params, products, regions, sizes, types } = this.props;

    console.log('products/Form render params', params);
    console.log('products/Form render products.toJS()', products.toJS());
    const fields = products.formProps.fields.map(field => field.name).toJS();

    const initialValues = !params.id ? {} : Immutable.Map(products.formProps.fields
      .map(fieldProp => {

        const valueMap = products.map.get(params.id).toJS()

        switch (fieldProp.type) {
          case 'references hierarchy':
            const refs = valueMap[fieldProp.name];
            return [fieldProp.name, refs.map(ref => ref.id)];

          default:
            return [fieldProp.name, valueMap[fieldProp.name]];

        }
      })).toJS();

    const onSubmit = (formVals, dispatch) => {
      dispatch(actions.createOrUpdate(formVals))
    }

    const formProps = {
      fields,
      initialValues,
      onSubmit,
      table: products,
      tableName: actions.TABLE_NAME,

      products,
      regions,
      sizes,
      types,
    };

    const formTitle = params.id ?
      <span>Edit <em>{initialValues.name || initialValues.title}</em></span> :
      <span>Create new {actions.TABLE_NAME_SINGULAR}</span>;

    return (
      <div className="admin-page table-form-page">
        <Helmet title="Products" />
        <h2>{formTitle}</h2>
        <DynamicForm {...formProps}/>
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
    {
      promise: ({ params, store }) => {
        if (!params.id)
          return null;
        return store.dispatch(actions.getById(params.id));
      }
    },
  ],
  (state) => {

    return {
      loading: state.admin.loading,
      message: state.admin.message,
//      table: state[actions.TABLE_NAME],
//      tableName: actions.TABLE_NAME,

      products: state.products,
      regions: state.regions,
      sizes: state.sizes,
      types: state.types,
    };
  },

)(Form);
