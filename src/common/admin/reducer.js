import * as actions from './actions'
import Immutable from 'immutable'

const InitialState = Immutable.Record({
  loading: false,
  message: '',
  open: null,

  tables: Immutable.List(),

  regions: Immutable.Map(),
  sizes: Immutable.Map(),
  types: Immutable.Map(),
  products: Immutable.Map(),
})
const initialState = new InitialState

export default function adminReducer(state = initialState, action) {
  if (!(state instanceof InitialState))
    return initialState
      .set('tables', Immutable.List(state.tables))

  switch (action.type) {

    case actions.TOGGLE_OFFCANVAS:
      return state.set('open', state.get('open') === 'left' ? null : 'left')

    case actions.ADMIN_BOOTSTRAP_ERROR:
    case actions.ADMIN_INIT_LOAD_ERROR:
      console.error('adminReducer ADMIN_INIT_LOAD_ERROR action', action)
      console.error('adminReducer ADMIN_INIT_LOAD_ERROR state', state)
      return state

    case actions.ADMIN_INIT_LOAD_SUCCESS:
        return state
          .set('tables', Immutable.List(
            action.payload.filter(item => item.name.indexOf('knex_') === -1)
          ))

  }

  return state
}
