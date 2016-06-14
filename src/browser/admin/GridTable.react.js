import Component from 'react-pure-render/component'
import React, { PropTypes } from 'react'
//import { FormattedHTMLMessage, defineMessages } from 'react-intl'
import { Table } from 'react-foundation-components/lib/table'
import { Pagination } from 'react-foundation-components/lib/pagination';

export default class GridTable extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pageTable: PropTypes.func.isRequired,
    table: PropTypes.object.isRequired,
    tableName: PropTypes.string.isRequired,
  }


  handleSelect = (activePage) => {
    const {dispatch, pageTable, tableName} = this.props
    dispatch(pageTable(tableName, activePage))
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
