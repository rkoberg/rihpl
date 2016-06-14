
import { PAGE_TABLE, TABLES_BOOTSTRAP_SUCCESS } from '../tables/actions'
import Immutable from 'immutable'

import {initializeTableState, TableInitialState, setList, setMeta} from '../tables/model'

const TABLE_NAME = 'sizes'

const TableItem = Immutable.Record({
  grams: 0,
  id: '',
  name: '',
})

export default function sizesReducer(state = new TableInitialState, action) {

  if (!(state instanceof TableInitialState)) {
    return initializeTableState(state, TableItem, true)
  }

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
