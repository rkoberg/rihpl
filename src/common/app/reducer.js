import * as actions from './actions';
import { Map, Record } from 'immutable';

const InitialState = Record({
  isSideMenuOpen: false,
  regions: Map(),
  sizes: Map(),
  types: Map(),
});
const initialState = new InitialState;

export default function appReducer(state = initialState, action) {

//  console.log('appReducer action', action);
//  console.log('appReducerS state', state);

  if (!(state instanceof InitialState))
    return initialState;

  switch (action.type) {

    case actions.INIT_LOAD_ERROR:
      console.error('appReducer INIT_LOAD_ERROR action', action);
      console.error('appReducer INIT_LOAD_ERROR state', state);
      return state

    case actions.ON_SIDE_MENU_CHANGE: {
      const { isOpen } = action.payload;
      return state.set('isSideMenuOpen', isOpen);
    }

    case actions.TOGGLE_SIDE_MENU:
      return state.update('isSideMenuOpen', isSideMenuOpen => !isSideMenuOpen);

  }

  return state;
}
