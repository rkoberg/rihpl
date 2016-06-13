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
   console.log('handleSelect activePage', activePage);
    dispatch(pageTable(tableName, activePage))
  }

  render() {
    // console.log('this.props', this.props)
    const {
      table: {
        activePage, meta, rangeSize, map, totalItems
      }
    } = this.props

    const numPages = Math.ceil(totalItems / rangeSize)
    const startItem = ((activePage - 1) * rangeSize)
    const endItem = startItem + (rangeSize - 1)
    console.log('GridTable render activePage', activePage)
    console.log('GridTable rendernumPages', numPages)
    console.log('GridTable renderstartItem', startItem)
    console.log('GridTable renderendItem', endItem)

    const iterableItems = map.valueSeq().slice(startItem, endItem)
    const iterableCols = meta.columns ? meta.columns.valueSeq() : []
//    console.log('iterableItems', iterableItems.toJS())
//    console.log('meta.columns', meta.columns.toJS())

    return (
      <div className="grid-table-wrapper">
        <Table>
          <thead>
          <tr>
            {iterableCols.map(col => <th key={col.name}>{col.name}</th>)}
          </tr>
          </thead>
          <tbody>
          {iterableItems.map(row =>
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
