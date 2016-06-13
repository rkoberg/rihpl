
import { PAGE_TABLE, TABLES_BOOTSTRAP_SUCCESS, TABLES_LOAD_START, TABLES_LOAD_SUCCESS } from '../tables/actions'
import Immutable from 'immutable'

import {loadMap, TableInitialState, setMap, setMeta} from '../tables/TableDef'

const TABLE_NAME = 'products'

const TableItem = Immutable.Record({
  id: '',
  name: '',
  vintage: 0,
  saleprice: 0,
  listprice: 0,
  quantity: 0,
  type_id: '',
  size_id: '',
  created_at: '',
  updated_at: '',
})

export default function productsReducer(state = new TableInitialState, action) {

  if (!(state instanceof TableInitialState))
    return new TableInitialState()
      .set('activePage', state.activePage)
      .set('map', setMap(TableItem, state.map))
      .set('meta', setMeta(state.meta))
      .set('preloaded', false)
      .set('rangeSize', state.rangeSize)
      .set('sortBy', state.sortBy)
      .set('totalItems', state.totalItems)

  switch (action.type) {

    case TABLES_BOOTSTRAP_SUCCESS:
      if (action.meta.key === TABLE_NAME)
        return state.set('meta', setMeta(action.payload))

    case TABLES_LOAD_SUCCESS:
      if (action.meta.key === TABLE_NAME) {
        // console.log('TABLES_LOAD_SUCCESS action', action);
        const {activePage, items, totalItems} = action.payload
        // console.log('TABLES_LOAD_SUCCESS items', items);
        return state
          .set('activePage', activePage)
          .mergeIn(['map'], items.map(item => [item.id, new TableItem(item)]))
          .set('totalItems', totalItems)
      }

    case PAGE_TABLE:
      if (action.meta.tableName === TABLE_NAME)
        return state
          .set('activePage', action.meta.activePage)
  }

  return state
}
