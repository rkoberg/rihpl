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

  // if (state instanceof Promise) return initialState.merge(Promise.resolve(state))

  if (!(state instanceof InitialState)) return initialState;

  switch (action.type) {

    case actions.INIT_LOAD_SIZES_SUCCESS:
      // console.log('appReducer INIT_LOAD_SIZES_SUCCESS action', action);
      // console.log('appReducer INIT_LOAD_SIZES_SUCCESS state', state);
      // return state.merge(action.payload)
      return state
    case actions.INIT_LOAD_SIZES_ERROR:
      console.log('appReducer INIT_LOAD_SIZES_ERROR action', action);
      console.log('appReducer INIT_LOAD_SIZES_ERROR state', state);
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
