
import { PAGE_TABLE, TABLES_BOOTSTRAP_SUCCESS } from '../tables/actions'
import Immutable from 'immutable'

import {initializeTableState, TableInitialState, setMeta} from '../tables/model'

const TABLE_NAME = 'types'

const TableItem = Immutable.Record({
  id: '',
  name: '',
})

export default function typesReducer(state = new TableInitialState, action) {

  if (!(state instanceof TableInitialState)) {
    return initializeTableState(state, TableItem, true)
  }

  switch (action.type) {

    case TABLES_BOOTSTRAP_SUCCESS:
      if (action.meta.key === TABLE_NAME)
        return state.set('meta', setMeta(action.payload))

    case PAGE_TABLE:
      if (action.meta.tableName === TABLE_NAME) {
        const activePage = action.meta.activePage
        const startItem = ((activePage - 1) * state.rangeSize)
        const endItem = startItem + (state.rangeSize - 1)
        return state
          .set('activePage', action.meta.activePage)
          .set('currentItems', state.map
            .valueSeq()
            .sort((a, b) => a[state.sortBy] > b[state.sortBy])
            .slice(startItem, endItem)
          )
      }
  }

  return state
}
