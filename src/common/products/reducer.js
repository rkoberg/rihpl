import { INIT_LOAD_SUCCESS } from '../app/actions'
import { ADMIN_BOOTSTRAP_SUCCESS } from '../admin/actions'
import Immutable from 'immutable'

const InitialState = Immutable.Record({
  preloaded: false,
  map: Immutable.Map(),
  meta: Immutable.Map(),
})

export default function productsReducer(state = new InitialState, action) {

  if (!(state instanceof InitialState))
    return new InitialState()
      .set('map', Immutable.Map(state.map))
      .set('meta', Immutable.Map(state.meta))

  switch (action.type) {

    case ADMIN_BOOTSTRAP_SUCCESS:
      if (action.meta.key === 'products')
        return state.set('meta', Immutable.Map(action.payload))

  }

  return state
}
