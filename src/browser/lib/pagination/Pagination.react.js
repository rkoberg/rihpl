import Component from 'react-pure-render/component'
import React, { PropTypes } from 'react'
//import linksMessages from '../../common/app/linksMessages'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import {reduxForm} from 'redux-form'
import { browserHistory } from 'react-router'


export const fields = [ 'pageNum' ]

class Pagination extends Component {

  static propTypes = {
    activePage: PropTypes.number.isRequired,
    maxPages: PropTypes.number.isRequired,
    pathPrefix: PropTypes.string,
    totalPages: PropTypes.number.isRequired,
  };

  render() {
    const {
      activePage,
     fields: { pageNum },
      pagerForm,
      handleSubmit,
      maxPages, pathPrefix, totalPages
    } = this.props

    let inputMaxlength = 1
    if (totalPages > 9 && totalPages < 100)
      inputMaxlength = 2
    if (totalPages > 99 && totalPages < 1000)
      inputMaxlength = 3
    if (totalPages > 999 && totalPages < 10000)
      inputMaxlength = 4

    let inputWidth = inputMaxlength === 1 ? 2 : inputMaxlength

//    onChange={(event) => this.props.activePage = event.target.value}
//    name="activePage"
//    value={activePage}

//    {...pageNum}
    return (
      <form onSubmit={handleSubmit(pagerForm.bind(this))}>
        <ul className="pagination text-center" role="navigation" aria-label="Pagination">
          {activePage === 1 ?
            <li className="pagination-previous disabled" key="prev">Previous</li> :
            <li className="pagination-previous" key="prev">
              <Link to={`${pathPrefix}${activePage - 1}`}>Previous</Link>
            </li>}
          <li>
            <input
              className="pager-active-page"
              maxLength={inputMaxlength}
              style={{width: `${inputWidth}rem`}}
              type="text"
              {...pageNum}
            />
            <span className="pager-sep">/</span>
            <span className="pager-total-pages">{totalPages}</span>
          </li>
          {activePage === totalPages ?
            <li className="pagination-next disabled" key="next">Next</li> :
            <li className="pagination-next" key="next">
              <Link to={`${pathPrefix}${activePage + 1}`}>Next</Link>
            </li>}
        </ul>
      </form>
    )
  }
}
const mapStateToProps = (state, props) => {
  console.log('Pagination mapStateToProps state.products.activePage', state.products.activePage);
  return {
    pageNum: state.products.activePage,
  }
};

Pagination = reduxForm({
 form: 'pagination',
 fields
})(Pagination);

export default Pagination
