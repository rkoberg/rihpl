import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
// import linksMessages from '../../common/app/linksMessages'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';

export const fields = ['pageNum'];

const submitValidation = (totalPages, pagerForm) => {
  return (values, dispatch) => {
    return new Promise((resolve, reject) => {
      if (!values.pageNum)
        reject({ pageNum: 'The page number is required' });

      const pageNum = Number(values.pageNum);
      if (pageNum === NaN || !(pageNum > 0 && pageNum <= totalPages))
        reject({ pageNum: `The page number must be a number from 1 to ${totalPages}` });
      else {
        dispatch(pagerForm);
        resolve();
      }
    });
  };
};


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
    } = this.props;

    let inputMaxlength = 1;
    if (totalPages > 9 && totalPages < 100)
      inputMaxlength = 2;
    if (totalPages > 99 && totalPages < 1000)
      inputMaxlength = 3;
    if (totalPages > 999 && totalPages < 10000)
      inputMaxlength = 4;

    let inputWidth = inputMaxlength === 1 ? 2 : inputMaxlength;

    return (
      <form onSubmit={handleSubmit(submitValidation(totalPages, pagerForm.bind(this)))}>
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
              style={{ width: `${inputWidth}rem` }}
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
        {pageNum.touched && pageNum.error &&
        <div className="alert callout">{pageNum.error}</div>}
      </form>
    );
  }
}
const mapStateToProps = (state, props) => {
  const { tableName } = props;

  return {
    initialValues: {
      pageNum: state[tableName].activePage
    },
  };
};

Pagination = reduxForm({
  form: 'pagination',
  fields
}, mapStateToProps)(Pagination);

export default Pagination;
