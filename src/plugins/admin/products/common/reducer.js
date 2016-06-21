
import Immutable from 'immutable';

import { FieldProps, FormProps, initializeTableState, TableInitialState } from '../../../tables/common/model';

import * as actions from '../common/actions';
//import * as model from '../common/model';

export const TableItem = Immutable.Record({
  id: '',
  name: '',
  vintage: 0,
  saleprice: 0,
  listprice: 0,
  quantity: 0,
  regions: Immutable.List(),
  type_id: '',
  size_id: '',
  created_at: '',
  updated_at: '',
});


export const fieldProps = [
  {
    name: 'id',
    type: 'hidden'
  },
  {
    name: 'name',
    help: 'Search friendly long name',
    label: 'Wine name',
  },
  {
    name: 'vintage',
    label: 'Wine name',
    maxLength: 4,
    validation: ['number', 'gt:0', 'lt:nextYear']
  },
  {
    name: 'saleprice',
    format: 'currency',
    label: 'Sale price',
    validation: ['number', 'gt:0'],
  },
  {
    name: 'listprice',
    format: 'currency',
    label: 'Sale price',
    validation: ['number', 'gt:0'],
  },
  {
    name: 'quantity',
    label: 'Quantity in stock',
    maxLength: 6,
    validation: ['number', 'gt:0']
  },
  {
    name: 'type_id',
    help: 'Start typing the variety or select from list.',
    label: 'Wine variety',
    references: 'types',
    type: 'reference',
  },
  {
    name: 'size_id',
    help: 'Select from list.',
    label: 'Wine size',
    references: 'sizes',
    type: 'reference',
  },
  {
    name: 'regions',
    help: 'Start typing the most specific region and its ancestry will be included.',
    label: 'Region heirarchy',
    references: 'regions',
    type: 'references hierarchy',
  },
  {
    name: 'created_at',
    label: 'Created at',
    type: 'read only date'
  },
  {
    name: 'updated_at',
    label: 'Updated at',
    type: 'read only date'
  }
];


export default function productsReducer(state = new TableInitialState, action) {

  if (!(state instanceof TableInitialState)) {
    return initializeTableState({
      state,
      TableItem,
      tableName: actions.TABLE_NAME,
      fieldProps,
    });
  }

  switch (action.type) {

    case actions.LOAD_SUCCESS:
      const { activePage, items, query, totalItems } = action.payload;

      const newMap = Immutable.Map(items.map(item => [item.id, new TableItem(item)]));
      const sortBy = query.sortBy || state.sortBy || 'name';

      return state
        .set('activePage', activePage)
        .set('currentItems', newMap
          .valueSeq()
          .sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            if (aVal == bVal)
              return 0;
            return aVal > bVal ? 1 : -1;
          })
        )
        .set('formProps', new FormProps({
          fields: Immutable.List(fieldProps.map(props => new FieldProps(props)))
        }))
        .mergeIn(['map'], newMap)
        .set('name', actions.TABLE_NAME)
        .set('sortBy', sortBy)
        .set('totalItems', Number(totalItems));

    case actions.GET_BY_ID_SUCCESS:
    case actions.CREATE_OR_UPDATE_SUCCESS:
        return state
          .setIn(['map', action.payload.id], new TableItem(action.payload));
  }

  return state;
}
