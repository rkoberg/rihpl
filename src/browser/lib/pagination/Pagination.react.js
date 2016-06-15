import Component from 'react-pure-render/component'
import React, { PropTypes } from 'react'
//import linksMessages from '../../common/app/linksMessages'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { connect } from 'react-redux'

export default class Pagination extends Component {

  static propTypes = {
    activePage: PropTypes.number.isRequired,
    maxPages: PropTypes.number.isRequired,
    pathPrefix: PropTypes.string,
    totalPages: PropTypes.number.isRequired,
  };

  render() {
    const { activePage, maxPages, onPaginationClick, pathPrefix, totalPages } = this.props

    const pages = []

//    const pageStartNum = activePage === 1 ? activePage :
//    const pageStopNum = maxPages > totalPages ? totalPages : activePage + maxPages

//    for (let i=activePage; i < pageStopNum; i++) {
//      if (i === activePage)
//        pages.push(<li key={i} className="current"><span className="show-for-sr">You're on page</span> {i}</li>)
//      else
//        pages.push(<li key={i}><Link onClick={() => onPaginationClick(i)} to={`${pathPrefix}${i}`} aria-label={`Page ${i}`}>{i}</Link></li>)
//    }


    let inputMaxlength = 1
    if (totalPages > 9 && totalPages < 100)
      inputMaxlength = 2
    if (totalPages > 99 && totalPages < 1000)
      inputMaxlength = 3
    if (totalPages > 999 && totalPages < 10000)
      inputMaxlength = 4

    let inputWidth = inputMaxlength === 1 ? 2 : inputMaxlength
    return (
      <ul className="pagination text-center" role="navigation" aria-label="Pagination">
        {activePage === 1 ?
          <li className="pagination-previous disabled" key="prev">Previous</li> :
          <li className="pagination-previous" key="prev"><Link onClick={() => onPaginationClick(activePage - 1)} to={`${pathPrefix}${activePage - 1}`}>Previous</Link></li>}
        <li>
          <input
            className="pager-active-page"
            maxLength={inputMaxlength}
            name="activePage"
            onChange={(event) => this.props.activePage = event.target.value}
            style={{width: `${inputWidth}rem`}}
            type="text"
            value={activePage}
          />
          <span className="pager-sep">/</span>
          <span className="pager-total-pages">{totalPages}</span>
        </li>
        {activePage === totalPages ?
          <li className="pagination-next disabled" key="next">Next</li> :
          <li className="pagination-next" key="next"><Link onClick={() => onPaginationClick(activePage + 1)} to={`${pathPrefix}${activePage + 1}`}>Next</Link></li>}
      </ul>
    )
  }

}

//export default connect(state => ({
////  viewer: state.users.viewer
//}))(Pagination)
