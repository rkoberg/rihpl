import { INIT_LOAD_SUCCESS } from '../app/actions'
import { List, Map, Record } from 'immutable'

const InitialState = Record({
  tables: List(),
})
const initialState = new InitialState

export default function formMetaReducer(state = initialState, action) {

  if (!(state instanceof InitialState))
    return initialState
      .set('tables', List(state.tables))

  switch (action.type) {

    case INIT_LOAD_SUCCESS:
      if (action.meta.key === '')
        return state.set('tables', List(action.payload))
//        return state.set('tables', List(action.payload.filter(table => table.name.indexOf('knex') === -1)))

  }

  return state
}
