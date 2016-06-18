import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import { Table } from 'react-foundation-components/lib/table';
// import { Pagination } from 'react-foundation-components/lib/pagination';
import Pagination from '../lib/pagination/Pagination.react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

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
      table: {
        activePage, currentItems, meta, rangeSize, totalItems
      },
      tableName,
    } = this.props;


    const numPages = Math.ceil(totalItems / rangeSize);
    const startItem = ((activePage - 1) * rangeSize);
    const endItem = startItem + (rangeSize - 1);
    const iterableCols = meta.columns ? meta.columns.valueSeq() : [];

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
      if (col.references) {
        return this.props[col.references.table].map.get(colVal).name;
      } else if (col.type === 'timestamp with time zone') {
        return <FormattedDate value={colVal} />;
      }
      return colVal;
    };

    return (
      <div className="grid-table-wrapper">
        <Table>
          <thead>
          <tr>
            {iterableCols.map(col => <th key={col.name}>
              <Link to={{ pathname: `${pathPrefix}1`, query: { sortBy: `${col.name}.desc` } }}>{col.name === 'id' ? 'Actions' : col.name}</Link>
            </th>)}
          </tr>
          </thead>
          <tbody>
          {currentItems.map(row =>
            <tr key={row.id}>
              {iterableCols.map(col => {
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
          )}
          </tbody>
        </Table>

        {numPages > 1 &&
        <Pagination {...paginationOptions} />
        }
      </div>
    );
  }
}
