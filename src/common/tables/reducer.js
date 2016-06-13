import { INIT_LOAD_SUCCESS } from '../app/actions'
import { ADMIN_BOOTSTRAP_SUCCESS } from '../admin/actions'
import Immutable from 'immutable'

const TableItem = Immutable.Record({
  schema: '',
  name: '',
  insertable: true
})

const InitialState = Immutable.Record({
  map: Immutable.Map()
})
const initialState = new InitialState

export default function tablesReducer(state = initialState, action) {

  if (!(state instanceof InitialState))
    return initialState
      .set('map', Immutable.Map(
        Object.keys(state.map)
          .map(key => [key, new TableItem(state.map[key])])))

  switch (action.type) {

//    case ADMIN_BOOTSTRAP_SUCCESS:
//      if (action.meta.key === 'sizes')
//        return state.set('meta', Immutable.Map(action.payload))

  }

  return state
}
