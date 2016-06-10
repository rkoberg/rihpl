import {INIT_LOAD_SUCCESS} from '../app/actions';
import { Map, Record } from 'immutable';

const InitialState = Record({
  map: Map(),
});
const initialState = new InitialState;

export default function regionsReducer(state = initialState, action) {

  if (!(state instanceof InitialState))
    return initialState
      .set('map', Map(state.map));

  switch (action.type) {

    case INIT_LOAD_SUCCESS:
      if (action.meta.key === 'regions')
        return state.set('map', Map(action.payload.map(item => [item.id, item])))

  }

  return state;
}
