import * as actions from './actions'
import Immutable from 'immutable'

const InitialState = Immutable.Record({
  loading: false,
  message: '',
  open: null,
})

export default function adminReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState))
    return new InitialState

  switch (action.type) {

    case actions.TOGGLE_OFFCANVAS:
      return state.set('open', state.get('open') === 'left' ? null : 'left')

    case actions.ADMIN_BOOTSTRAP_ERROR:
      console.error('adminReducer ADMIN_INIT_LOAD_ERROR action', action)
      console.error('adminReducer ADMIN_INIT_LOAD_ERROR state', state)
      return state

  }

  return state
}
