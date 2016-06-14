
import { PAGE_TABLE, TABLES_BOOTSTRAP_SUCCESS } from '../tables/actions'
import Immutable from 'immutable'

import {initializeTableState, TableInitialState, setList, setMeta} from '../tables/model'

const TABLE_NAME = 'regions'

const TableItem = Immutable.Record({
  id: '',
  name: '',
  level: 0,
  parent_id: '',
})

export default function regionsReducer(state = new TableInitialState, action) {

  if (!(state instanceof TableInitialState)) {
    return initializeTableState(state, TableItem, true)
  }

//  console.log('regionsReducer action', action);

  switch (action.type) {

    case TABLES_BOOTSTRAP_SUCCESS:
      if (action.meta.key === TABLE_NAME)
        return state.set('meta', setMeta(action.payload))

    case PAGE_TABLE:
      if (action.meta.tableName === TABLE_NAME)
        return state
          .set('activePage', action.meta.activePage)
  }

  return state
}
