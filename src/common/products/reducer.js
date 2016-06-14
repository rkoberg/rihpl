
import { PAGE_TABLE, TABLES_BOOTSTRAP_SUCCESS, TABLES_LOAD_START, TABLES_LOAD_SUCCESS } from '../tables/actions'
import Immutable from 'immutable'

import {initializeTableState, setupPageTable, setMeta, TableInitialState} from '../tables/model'

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

  if (!(state instanceof TableInitialState)) {
    return initializeTableState(state, TableItem, false)
  }

  switch (action.type) {

    case TABLES_BOOTSTRAP_SUCCESS:
      if (action.meta.key === TABLE_NAME)
        return state.set('meta', setMeta(action.payload))

    case TABLES_LOAD_SUCCESS:
      if (action.meta.key === TABLE_NAME) {
        console.log('products TABLES_LOAD_SUCCESS')
        const {activePage, items, totalItems} = action.payload

        const startItem = ((activePage - 1) * state.rangeSize)
        const newMap = Immutable.Map(items.map(item => [item.id, new TableItem(item)]))

        return state
//          .set('activePage', parseInt(activePage, 10))
//          .set('currentItems', newMap.valueSeq().sort((a, b) => a[state.sortBy] > b[state.sortBy]))
          .mergeIn(['map'], newMap)
//          .set('totalItems', parseInt(totalItems, 10))
      }

    case PAGE_TABLE:
      if (action.meta.tableName === TABLE_NAME)
        console.log('products PAGE_TABLE')
        return setupPageTable(state, action.meta.activePage)
  }

  return state
}
