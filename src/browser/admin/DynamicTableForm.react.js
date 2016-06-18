
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import * as tablesActions from '../../common/tables/actions';
import * as adminActions from '../../common/admin/actions';
import adminMessages from '../../common/admin/adminMessages';

import { reduxForm } from 'redux-form';
import { Row, Column } from 'react-foundation-components/lib/grid';

import { Button } from 'react-foundation-components/lib/button';
import { ButtonGroup } from 'react-foundation-components/lib/button-group';
import {
  FormField,
  FormFieldButton,
  FormFieldError,
  FormFieldHelp,
  FormFieldInline,
  FormFieldInput,
  FormFieldLabel,
} from 'react-foundation-components/lib/forms';

import Select from 'react-select';

class DynamicTableForm extends Component {

  static propTypes = {
//    loading: PropTypes.bool.isRequired,
//    message: React.PropTypes.oneOfType([
//      React.PropTypes.string,
//      React.PropTypes.bool,
//    ]).isRequired,
    fields: PropTypes.object.isRequired,
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
  };

  render() {

    const { fields, handleSubmit, initialValues, submitting, table, tableName } = this.props;

//    Object.keys(fields).map(key => fields[key].value = editableItem[key]);

    return (
      <form onSubmit={handleSubmit}>
        {Object.keys(fields).map((fieldName, fieldIndex) => {
          const field = fields[fieldName];


          const col = table.meta.columns.filter(column => column.name === fieldName).first();

          if (fieldName === 'id' && field.value) {
            return <FormFieldInput
              key={`${fieldName}${fieldIndex}`}
              type="hidden"
              {...field}
            />
          } else if (fieldName === 'id')
            return;

          if (fieldName === 'created_at' && field.value) {
            return <FormFieldInput
              key={`${fieldName}${fieldIndex}`}
              type="hidden"
              {...field}
            />
          } else if (fieldName === 'created_at')
            return;

          if (fieldName === 'updated_at' && field.value) {
            return <p key={`${fieldName}${fieldIndex}`}>
              <label>Created at:</label>
              <FormattedDate value={field.value}/> <FormattedTime value={field.value}/>
            </p>
          } else if (fieldName === 'updated_at')
            return;

          if (col.references) {

            const {table: refTableName, column: refCol} = col.references;
            const refTable = this.props[refTableName];

            if (refTable.map.size > 10) {
              const options = refTable.map
                .valueSeq()
                .map(opt => ({
                  label: opt.name,
                  value: opt.id
                })
              );

              const onSelectChange = (selectedObj) => {
                field.value = selectedObj.value;
              }
              const onBlur = (event) => {
                field.onBlur(field.value);
              }

              return (
                <FormField key={`${fieldName}${fieldIndex}`}>
                  <FormFieldLabel>{fieldName}</FormFieldLabel>
                  <Select
                    {...field}
                    options={options.toJS()}
                    onBlur={onBlur}
                  />
                  <FormFieldError>Select Error</FormFieldError>
                  <FormFieldHelp>Start typing what you want...</FormFieldHelp>
                </FormField>
              )
            } else {

              return (

//              error={this.state.error}
                <FormField key={`${fieldName}${fieldIndex}`}>
                  <FormFieldLabel>{fieldName}</FormFieldLabel>
                  <FormFieldInput
                    type="select"
                    {...field}
                  >
                    <option key={`${fieldName}${fieldIndex}default`}>- Choose -</option>
                    {refTable.map.valueSeq().map((val, valIndex) => <option key={`${val}${valIndex}`} value={val.id}>{val.name}</option>)}
                  </FormFieldInput>
                  <FormFieldError>Select Error</FormFieldError>
                  <FormFieldHelp>Select Help</FormFieldHelp>
                </FormField>
              )

            }

          }

          return (
            <FormField key={`${fieldName}${fieldIndex}`}>
              <FormFieldLabel>{fieldName}</FormFieldLabel>
              <FormFieldInput
                maxLength={col.maxLen}
                type="text"
                {...field}
              />
              <FormFieldError>Uncontrolled Text Error</FormFieldError>
            </FormField>
          )

        })}
        <Button color="primary" disabled={submitting} type="submit">Primary Color</Button>
      </form>
    );
  }

}

//export default DynamicTableForm;
export default reduxForm(
  { form: 'tableForm' },
//  state => { // mapStateToProps
//
//
//
//    return {
//      initialValues: state.account.data
//    }
//  },
)(DynamicTableForm)
