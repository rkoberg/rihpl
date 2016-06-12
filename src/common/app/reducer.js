import * as actions from './actions'
import * as uiActions from '../ui/actions'
import { Map, Record } from 'immutable'

const InitialState = Record({
  isSideMenuOpen: false,
})
const initialState = new InitialState

export default function appReducer(state = initialState, action) {

//  console.log('appReducer action', action);
//  console.log('appReducerS state', state);

  if (!(state instanceof InitialState))
    return initialState

  switch (action.type) {

    case actions.INIT_LOAD_ERROR:
      console.error('appReducer INIT_LOAD_ERROR action', action)
      console.error('appReducer INIT_LOAD_ERROR state', state)
      return state

    case uiActions.ON_SIDE_MENU_CHANGE: {
      const { isOpen } = action.payload
      return state.set('isSideMenuOpen', isOpen)
    }

    case uiActions.TOGGLE_SIDE_MENU:
      return state.update('isSideMenuOpen', isSideMenuOpen => !isSideMenuOpen)

  }

  return state
}
