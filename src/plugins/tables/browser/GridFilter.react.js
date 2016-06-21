import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import { Accordion, AccordionItem } from 'react-foundation-components/lib/accordion';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';


import { Row, Column } from 'react-foundation-components/lib/grid';
import { ShowForScreenSize, ShowOnlyForScreenSize } from 'react-foundation-components/lib/visibility';

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

import { reduxForm } from 'redux-form';

export const fields = ['name'];

export default class GridFilter extends Component {

  static propTypes = {
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
  }

//  constructor(props) {
//    super(props)
//    this.handleSubmit = this.handleSubmit.bind(this)
//  }
  render() {
    const {
      table,
      tableName,
    } = this.props;

    const {
      activePage, currentItems, rangeSize, totalItems,
      regions, sizes, types,
    } = table;

    let activeKey = 0;

    // error={this.state.error}
    return (
      <div className="grid-filter-wrapper">
        <Accordion defaultActiveKey="0" allowAllClosed>
          <AccordionItem eventKey="1" title="Filter/Sort">
            <form>
              <FormField>
                <FormFieldLabel>Name contains</FormFieldLabel>
                <FormFieldInput />
                <FormFieldError>Uncontrolled Text Error</FormFieldError>
                <FormFieldHelp>Uncontrolled Text Help</FormFieldHelp>
              </FormField>

              <Row className="wrapper-row">
                <Column small={12} medium={12} large={4} xlarge={4} xxlarge={4}>
                  <label>Size(s)
                    <select multiple>
                      {}
                      <option value="showboat">Showboat</option>
                      <option value="redwing">Redwing</option>
                      <option value="narcho">Narcho</option>
                      <option value="hardball">Hardball</option>
                    </select>
                  </label>
                </Column>
                <Column small={12} medium={12} large={4} xlarge={4} xxlarge={4}>
                  <label>Type(s)
                    <select multiple>
                      <option value="showboat">Showboat</option>
                      <option value="redwing">Redwing</option>
                      <option value="narcho">Narcho</option>
                      <option value="hardball">Hardball</option>
                    </select>
                  </label>
                </Column>
                <Column small={12} medium={12} large={4} xlarge={4} xxlarge={4}>
                  <label>Region(s)
                    <select multiple>
                      <option value="showboat">Showboat</option>
                      <option value="redwing">Redwing</option>
                      <option value="narcho">Narcho</option>
                      <option value="hardball">Hardball</option>
                    </select>
                  </label>
                </Column>
              </Row>
              <ButtonGroup expanded>
                <Button className="hollow disabled" color="primary" disable>Something disabled</Button>
                <Button className="hollow" color="primary">Clear</Button>
                <Button color="primary">Filter/Sort</Button>
              </ButtonGroup>
            </form>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}
