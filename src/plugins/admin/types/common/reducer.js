
import Immutable from 'immutable';

import { initializeTableState, TableInitialState } from '../../../tables/common/model';

const TABLE_NAME = 'types';

const TableItem = Immutable.Record({
  id: '',
  name: '',
});

export const fieldProps = [
  {
    name: 'id',
    type: 'hidden',
  },
];

export default function typesReducer(state = new TableInitialState, action) {

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
