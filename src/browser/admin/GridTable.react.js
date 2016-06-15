import Component from 'react-pure-render/component'
import React, { PropTypes } from 'react'
//import { FormattedHTMLMessage, defineMessages } from 'react-intl'
import { Table } from 'react-foundation-components/lib/table'
// import { Pagination } from 'react-foundation-components/lib/pagination';
import Pagination from '../lib/pagination/Pagination.react';

import { browserHistory } from 'react-router';

export default class GridTable extends Component {

  static propTypes = {
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
  }


  render() {
    const {
      table: {
        activePage, currentItems, meta, rangeSize, totalItems
      },
      tableName
    } = this.props

    const numPages = Math.ceil(totalItems / rangeSize)
    const startItem = ((activePage - 1) * rangeSize)
    const endItem = startItem + (rangeSize - 1)
    const iterableCols = meta.columns ? meta.columns.valueSeq() : []

    const paginationOptions = {
      activePage,
      maxPages: 9,
      pathPrefix: `/admin/tables/${tableName}/`,
      tableName,
      totalPages: numPages,
    }

    return (
      <div className="grid-table-wrapper">
        <Table>
          <thead>
          <tr>
            {iterableCols.map(col => <th key={col.name}>{col.name}</th>)}
          </tr>
          </thead>
          <tbody>
          {currentItems.map(row =>
            <tr key={row.id}>
              {iterableCols.map(col => <td key={row.id + col.name}>{row[col.name]}</td>)}
            </tr>
          )}
          </tbody>
        </Table>

        {numPages > 1 &&
        <Pagination {...paginationOptions}/>
        }
      </div>
    )
  }
}
