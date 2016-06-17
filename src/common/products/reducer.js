
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
    return initializeTableState(state, TableItem, 'products')
  }

  switch (action.type) {

    case TABLES_BOOTSTRAP_SUCCESS:
      if (action.meta.key === TABLE_NAME)
        return state.set('meta', setMeta(action.payload))

    case TABLES_LOAD_SUCCESS:
      if (action.meta.key === TABLE_NAME) {
        const {activePage, items, query, totalItems} = action.payload

        const newMap = Immutable.Map(items.map(item => [item.id, new TableItem(item)]))
        const sortBy = query.sortBy || state.sortBy || 'name'

        return state
          .set('activePage', activePage)
          .set('totalItems', totalItems || state.totalItems)
          .set('currentItems', newMap
            .valueSeq()
            .sort((a, b) => {
              const aVal = a[sortBy]
              const bVal = b[sortBy]
              if (aVal == bVal)
                return 0
              return aVal > bVal ? 1 : -1
            })
          )
          .mergeIn(['map'], newMap)

      }

  }

  return state
}
