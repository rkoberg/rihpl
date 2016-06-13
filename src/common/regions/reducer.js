
import { ADMIN_BOOTSTRAP_SUCCESS } from '../admin/actions'
import { PAGE_TABLE } from '../tables/actions'
import Immutable from 'immutable'

import {TableInitialState, setMap, setMeta} from '../models/TableDef'

const TableItem = Immutable.Record({
  id: '',
  name: '',
  level: 0,
  parent_id: '',
})

export default function regionsReducer(state = new TableInitialState, action) {

  if (!(state instanceof TableInitialState)) {
    const totalItems = Object.keys(state.map).length

    return initialState
      .set('activePage', 1)
      .set('map', setMap(TableItem, state.map))
      .set('meta', setMeta(state.meta))
      .set('preloaded', true)
      .set('rangeSize', 10)
      .set('sortBy', 'name')
      .set('totalItems', totalItems)
  }

//  console.log('regionsReducer action', action);

  switch (action.type) {

    case ADMIN_BOOTSTRAP_SUCCESS:
      if (action.meta.key === 'regions')
        return state.set('meta', setMeta(action.payload))

    case PAGE_TABLE:
      if (action.meta.tableName === 'regions')
        return state
          .set('activePage', action.meta.activePage)
  }

  return state
}
