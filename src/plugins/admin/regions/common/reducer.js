
import Immutable from 'immutable';

import { initializeTableState, TableInitialState } from '../../../tables/common/model';

const TABLE_NAME = 'regions';

const TableItem = Immutable.Record({
  id: '',
  name: '',
  level: 0,
  parent_id: '',
});

export const fieldProps = [
  {
    name: 'id',
    type: 'hidden',
  },
];

export default function regionsReducer(state = new TableInitialState, action) {

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
