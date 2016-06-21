
import Immutable from 'immutable';

export const TableInitialState = Immutable.Record({
  activePage: 1,
  currentItems: Immutable.List(),
  formProps: FormProps,
  map: Immutable.Map(),
  name: '',
  preloaded: false,
  rangeSize: 10,
  sortBy: 'name',
  sortOrder: 'asc',
  totalItems: 0,
});


export const FormProps = Immutable.Record({
  fields: Immutable.List(),
});


export const FieldProps = Immutable.Record({
  errorMsg: 'This field is required',
  format: 'plain',
  help: null,
  label: null,
  maxLength: 255,
  name: null,
  references: null,
  type: 'text',
  value: null,
});



export const getTableNameFromLocation = location => {
  const pathname = location.pathname;
  const pathArr = pathname.split('/');
  return pathArr[3];
};

export const getActionFromLocation = location => {
  const pathname = location.pathname;
  const pathArr = pathname.split('/');
  return pathArr[4];
};

export const getIdFromLocation = location => {
  const pathname = location.pathname;
  const pathArr = pathname.split('/');
  return pathArr.length === 6 ? pathArr.pop() : null;
};


export const initializeTableState = ({state, TableItem, tableName, fieldProps, isPreloaded = false}) => {

  console.log('initializeTableState fieldProps', fieldProps);
  const activePage = state.activePage || 1;
  const sortBy = state.sortBy || 'name';
  const rangeSize = state.rangeSize || 10;

  const startNum = isPreloaded ? ((activePage - 1) * rangeSize) : 0;
  const endNum = startNum + rangeSize;

  const mapKeys = Object.keys(state.map);
  const newMap = Immutable.Map(mapKeys.map(key => [key, new TableItem(state.map[key])]));
  const currentItems = newMap
    .valueSeq()
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal == bVal)
        return 0;
      return a[sortBy] > b[sortBy] ? 1 : -1;
    })
    .slice(startNum, endNum);

  return new TableInitialState()
    .set('activePage', activePage)
    .set('currentItems', currentItems)
    .set('formProps', new FormProps({
      fields: Immutable.List(fieldProps.map(props => new FieldProps(props)))
    }))
    .set('map', newMap)
    .set('name', tableName)
    .set('preloaded', isPreloaded)
    .set('rangeSize', rangeSize)
    .set('sortBy', sortBy)
    .set('totalItems', Number(state.totalItems) || Object.keys(state.map).length);
};

export const setupPageTable = (state, activePage, totalItems) => {
  const sortBy = state.sortBy || 'name';
  const startNum = ((activePage - 1) * state.rangeSize);
  const endNum = startNum + state.rangeSize;
  return state
    .set('activePage', activePage)
    .set('totalItems', totalItems || state.totalItems)
    .set('currentItems', state.map
      .valueSeq()
      .sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        if (aVal == bVal)
          return 0;
        return a[sortBy] > b[sortBy] ? 1 : -1;
      })
      .slice(startNum, endNum)
    );
};
