import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { FormattedDate } from 'react-intl';
import { Table } from 'react-foundation-components/lib/table';
// import { Pagination } from 'react-foundation-components/lib/pagination';
import Pagination from '../../pagination/Pagination.react';
import GridFilter from './GridFilter.react';

export default class GridTable extends Component {

  static propTypes = {
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
  }

//  constructor(props) {
//    super(props)
//    this.handleSubmit = this.handleSubmit.bind(this)
//  }


  handleSubmit() {
    const { pathPrefix, values: { pageNum } } = this.props;
    browserHistory.push(`${pathPrefix}${pageNum}`);
  }

  render() {
    const {
      pathPrefix,
      table,
      tableName,
    } = this.props;


    const { activePage, currentItems, formProps, rangeSize, totalItems } = table;
    console.log('GridTable render currentItems', currentItems.toJS());

    const numPages = Math.ceil(totalItems / rangeSize);
    const startItem = ((activePage - 1) * rangeSize);
    const endItem = startItem + (rangeSize - 1);
    console.log('GridTable render formProps', formProps);

    const paginationOptions = {
      activePage,
      maxPages: 9,
      pagerForm: this.handleSubmit,
      pathPrefix,
      tableName,
      totalPages: numPages,
    };

    const cellVal = (row, col) => {
      const colVal = row[col.name];
      if (col.type === 'reference') {
        return this.props[col.references].map.get(colVal).name;
      } else if (col.type === 'read only date') {
        return <FormattedDate value={colVal} />;
      }
      return Array.isArray(colVal) ? colVal.map(val => val.name).join(', ') : colVal;
    };

//    const gridFilterOptions = { pathPrefix, table, tableName, regions, sizes, types };
    const gridFilterOptions = {
      tableName,
      table,
    }

    return (
      <div className="grid-table-wrapper">
        <GridFilter {...gridFilterOptions} />
        <Table>
          <thead>
          <tr>
            {formProps.fields.map(col => (
                <th key={col.name}>
                  <Link to={{ pathname: `${pathPrefix}1`, query: { sortBy: `${col.name}.desc` } }}>{col.name === 'id' ? 'Actions' : col.label}</Link>
                </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {currentItems.map(row => (
            <tr key={row.id}>
              {formProps.fields.map(col => {
                if (col.name === 'id') {
                  const id = cellVal(row, col);
                  return (
                    <td key={row.id + col.name}>
                      <Link to={`${pathPrefix}edit/${id}`}>Edit</Link>
                    </td>
                  )
                }
                return <td key={row.id + col.name}>{cellVal(row, col)}</td>
              })}
            </tr>
          ))}
          </tbody>
        </Table>

        {numPages > 1 &&
        <Pagination {...paginationOptions} />
        }
      </div>
    );
  }
}
