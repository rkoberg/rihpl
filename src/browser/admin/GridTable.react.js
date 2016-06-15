import Component from 'react-pure-render/component'
import React, { PropTypes } from 'react'
//import { FormattedHTMLMessage, defineMessages } from 'react-intl'
import { Table } from 'react-foundation-components/lib/table'
// import { Pagination } from 'react-foundation-components/lib/pagination';
import Pagination from '../lib/pagination/Pagination.react';

import { browserHistory } from 'react-router';
import { push as routerPush } from 'react-router-redux';

export default class GridTable extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pageTable: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
  }


  onPaginationClick = (activePage) => {
    const {dispatch, location, pageTable, tableName} = this.props
//    const activePage = parseInt(location.pathname.split('/').pop(), 10)
    console.log('GridTable onPaginationClick activePage', activePage)
    dispatch(pageTable(tableName, activePage))
  }

  render() {
    // console.log('this.props', this.props)
    const {
      table: {
        activePage, currentItems, map, meta, rangeSize, sortBy, totalItems
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
      onPaginationClick: this.onPaginationClick,
      pathPrefix: `/admin/tables/${tableName}/`,
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
/*

 activePage={activePage}
 alignment="center"
 maxPages={9}
 numPages={numPages}
 nextContent="Next"
 onSelect={this.handleSelect}
 previousContent="Previous"
 */
}
