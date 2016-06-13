
import { TABLES_BOOTSTRAP_ERROR, TABLES_LOAD_ERROR } from '../tables/actions'
import Immutable from 'immutable'

const TableItem = Immutable.Record({
  schema: '',
  name: '',
  insertable: true
})

const InitialState = Immutable.Record({
  map: Immutable.Map()
})

export default function tablesReducer(state = new InitialState, action) {

  if (!(state instanceof InitialState))
    return new InitialState()
      .set('map', Immutable.Map(
        Object.keys(state.map)
          .map(key => [key, new TableItem(state.map[key])])))

  switch (action.type) {


    case TABLES_LOAD_ERROR:
    case TABLES_BOOTSTRAP_ERROR:
      console.error('adminReducer ADMIN_INIT_LOAD_ERROR action', action)
      console.error('adminReducer ADMIN_INIT_LOAD_ERROR state', state)
      return state

  }


  return state
}
