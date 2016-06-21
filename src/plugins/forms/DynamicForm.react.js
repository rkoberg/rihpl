
import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import * as tablesActions from '../tables/common/actions';
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

class DynamicForm extends Component {

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

    const dateDisplay = (field, fieldProps) => field.value ? (<p key={fieldProps.name} className="formatted-date">
      <label>{fieldProps.label} at:</label>
      <FormattedDate value={field.value}/> <FormattedTime value={field.value}/>
    </p>) : null;

    const handleReference = (refTable, field, fieldProps) => {
      if (refTable.map.size > 10) {
        const options = refTable.map
          .valueSeq()
          .sort((a, b) => a.name > b.name ? 1 : -1)
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
          <FormField key={`${fieldProps.name}`}>
            <FormFieldLabel>{fieldProps.label}</FormFieldLabel>
            <Select
              {...field}
              options={options.toJS()}
              onBlur={onBlur}
            />
            {fieldProps.errorMsg && <FormFieldError>{fieldProps.errorMsg}</FormFieldError>}
            {fieldProps.help && <FormFieldHelp>{fieldProps.help}</FormFieldHelp>}
          </FormField>
        )
      } else {

        return (

//              error={this.state.error}
          <FormField key={`${fieldProps.name}`}>
            <FormFieldLabel>{fieldProps.label}</FormFieldLabel>
            <FormFieldInput
              type="select"
              {...field}
            >
              <option key={`${fieldProps.name}default`}>- Choose -</option>
              {refTable.map
                .valueSeq()
                .sort((a, b) => {
                  return a.name > b.name ? 1 : -1
                })
                .map((val, valIndex) => <option key={`${val}${valIndex}`} value={val.id}>{val.name}</option>)}
            </FormFieldInput>
            {fieldProps.errorMsg && <FormFieldError>{fieldProps.errorMsg}</FormFieldError>}
            {fieldProps.help && <FormFieldHelp>{fieldProps.help}</FormFieldHelp>}
          </FormField>
        )
      }
    }



    return (
      <form onSubmit={handleSubmit}>
        {table.formProps.fields.map(fieldProps => {
          const field = fields[fieldProps.name];
          switch (fieldProps.type) {
            case 'hidden':
              return field.value ? <FormFieldInput
                key={fieldProps.name}
                type="hidden"
                {...field}
              /> : null;

            case 'text':
              return <FormField key={fieldProps.name}>
                <FormFieldLabel>{fieldProps.label}</FormFieldLabel>
                <FormFieldInput
                  maxLength={fieldProps.maxLength}
                  type="text"
                  {...field}
                />
                {fieldProps.errorMsg && <FormFieldError>{fieldProps.errorMsg}</FormFieldError>}
                {fieldProps.help && <FormFieldHelp>{fieldProps.help}</FormFieldHelp>}
              </FormField>

            case 'read only date':
              return dateDisplay(field, fieldProps);

            case 'reference':
              return handleReference(this.props[fieldProps.references], field, fieldProps);

            case 'references hierarchy':

              console.log('DynamicForm render field', field);
              console.log('DynamicForm render fields.id.value', fields.id.value);
              const focusRecord = table.map.get(fields.id.value);
//              console.log('DynamicForm render focusRecord', focusRecord.toJS());
              console.log('references hierarchy fieldProps.name', fieldProps.name);
//              console.log('references hierarchy focusRecord[fieldProps.name]', focusRecord[fieldProps.name]);
              const refTable = this.props[fieldProps.name];
//              console.log('references hierarchy refTable', refTable);
//              const recs = relsTable.map.valueSeq().filter(item => fields.id.value === item.product_id);
//              console.log('references hierarchy recs', recs);



//              let selectedOptions = [];
//              if (focusRecord)
//                selectedOptions = focusRecord[fieldProps.name]
//                  .sort((a, b) => a.level > b.level ? 1 : -1)
//                  .map(opt => ({
//                    label: opt.name,
//                    value: opt.id
//                  }));


              const options = refTable.map
                .valueSeq()
                .sort((a, b) => a.name > b.name ? 1 : -1)
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
                <FormField key={`${fieldProps.name}`}>
                  <FormFieldLabel>{fieldProps.label}</FormFieldLabel>
                  <Select
                    {...field}
                    multi
                    options={options.toJS()}
                    onBlur={onBlur}
                  />
                  {fieldProps.errorMsg && <FormFieldError>{fieldProps.errorMsg}</FormFieldError>}
                  {fieldProps.help && <FormFieldHelp>{fieldProps.help}</FormFieldHelp>}
                </FormField>
              )

            default:

              return <h1 key={fieldProps.name} style={{color: 'red'}}>{fieldProps.name}: {fieldProps.type}</h1>;

          }
        })}
        <div className="controls-row expanded button-group">
          <Button color="primary" disabled={submitting} type="submit">Primary Color</Button>
        </div>
      </form>
    );
  }

}

//export default DynamicForm;
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
)(DynamicForm)
