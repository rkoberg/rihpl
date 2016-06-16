import * as actions from './actions'
import { Record } from 'immutable'

const InitialState = Record({
  formDisabled: false,
  formError: null
})

export default function authReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState)) return new InitialState(state);

  switch (action.type) {

//    case actions.LOGIN_START:
//    case firebaseActions.ESTE_REDUX_FIREBASE_LOGIN_START:
//    case firebaseActions.ESTE_REDUX_FIREBASE_RESET_PASSWORD_START:
//    case firebaseActions.ESTE_REDUX_FIREBASE_SIGN_UP_START:
//      return state.set('formDisabled', true);
//
//    case actions.LOGIN_ERROR:
//    case firebaseActions.ESTE_REDUX_FIREBASE_LOGIN_ERROR:
//    case firebaseActions.ESTE_REDUX_FIREBASE_RESET_PASSWORD_ERROR:
//    case firebaseActions.ESTE_REDUX_FIREBASE_SIGN_UP_ERROR:
//      return state.merge({
//        formDisabled: false,
//        formError: action.payload
//      });
//
//    case actions.LOGIN_SUCCESS:
//    case firebaseActions.ESTE_REDUX_FIREBASE_LOGIN_SUCCESS:
//    case firebaseActions.ESTE_REDUX_FIREBASE_RESET_PASSWORD_SUCCESS:
//    case firebaseActions.ESTE_REDUX_FIREBASE_SIGN_UP_SUCCESS:
//      return state.merge({
//        formDisabled: false,
//        formError: null
//      });

  }

  return state
}
