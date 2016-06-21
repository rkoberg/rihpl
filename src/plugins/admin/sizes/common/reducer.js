
import Immutable from 'immutable';

import { initializeTableState, TableInitialState } from '../../../tables/common/model';

const TABLE_NAME = 'sizes';

const TableItem = Immutable.Record({
  grams: 0,
  id: '',
  name: '',
});

export const fieldProps = [
  {
    name: 'id',
    type: 'hidden',
  },
];

export default function sizesReducer(state = new TableInitialState, action) {

  if (!(state instanceof TableInitialState)) {
    return initializeTableState({
      state,
      TableItem,
      tableName: TABLE_NAME,
      fieldProps,
      isPreloaded: true,
    });
  }

  return state;
}
