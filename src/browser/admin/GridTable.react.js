import Component from 'react-pure-render/component'
import React, { PropTypes } from 'react'
//import { FormattedHTMLMessage, defineMessages } from 'react-intl'
import { Table } from 'react-foundation-components/lib/table'
// import { Pagination } from 'react-foundation-components/lib/pagination';
import { Pagination } from '../foundation/pagination';

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


  handleSelect = (activePage) => {
    // console.log('GridTable handleSelect this.props', this.props)
    // const {dispatch, history, location, pageTable, tableName} = this.props
    // console.log('GridTable handleSelect history', history)
    // console.log('GridTable handleSelect browserHistory', browserHistory)
    // const pathArr = location.pathname.split('/')
    // pathArr.pop()
    // pathArr.push(activePage)
    // const nextPathname = pathArr.join('/')
    // location.pathname = nextPathname
    // dispatch(routerPush(nextPathname))
    // browserHistory.push(nextPathname)
    // dispatch(pageTable(tableName, activePage))
  }

  render() {
    // console.log('this.props', this.props)
    const {
      table: {
        activePage, currentItems, map, meta, rangeSize, sortBy, totalItems
      }
    } = this.props

    const numPages = Math.ceil(totalItems / rangeSize)
    const startItem = ((activePage - 1) * rangeSize)
    const endItem = startItem + (rangeSize - 1)
    const iterableCols = meta.columns ? meta.columns.valueSeq() : []

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
        <Pagination
          activePage={activePage}
          alignment="center"
          maxPages={9}
          numPages={numPages}
          nextContent="Next"
          onSelect={this.handleSelect}
          previousContent="Previous"
        />
        }
      </div>
    )
  }

}
