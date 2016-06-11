import * as actions from './actions'
import Immutable from 'immutable'

const InitialState = Immutable.Record({
  loading: false,
  message: '',
  open: null,
})
const initialState = new InitialState

export default function adminReducer(state = initialState, action) {
  if (!(state instanceof InitialState))
    return initialState

  switch (action.type) {

    case actions.TOGGLE_OFFCANVAS:
      return state.set('open', state.get('open') === 'left' ? null : 'left')

  }

  return state
}
