import { INIT_LOAD_SUCCESS } from '../app/actions'
import { ADMIN_BOOTSTRAP_SUCCESS } from '../admin/actions'
import Immutable from 'immutable'

const InitialState = Immutable.Record({
  preloaded: true,
  map: Immutable.Map(),
  meta: Immutable.Map(),
})
const initialState = new InitialState

export default function sizesReducer(state = initialState, action) {

  if (!(state instanceof InitialState))
    return initialState
      .set('map', Immutable.Map(state.map))
      .set('meta', Immutable.Map(state.meta))

  switch (action.type) {

    case INIT_LOAD_SUCCESS:
      if (action.meta.key === 'sizes')
        return state.set('map', Immutable.Map(action.payload.map(item => [item.id, item])))

    case ADMIN_BOOTSTRAP_SUCCESS:
      if (action.meta.key === 'sizes')
        return state.set('meta', Immutable.Map(action.payload))

  }

  return state
}
