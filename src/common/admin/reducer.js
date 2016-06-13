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

  }

  return state
}
