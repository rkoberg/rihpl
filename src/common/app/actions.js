import { setCurrentLocale } from '../intl/actions';

export const UPDATE_APP_STATE_FROM_STORAGE = 'UPDATE_APP_STATE_FROM_STORAGE';

export const INIT_LOAD = 'INIT_LOAD'
export const INIT_LOAD_START = 'INIT_LOAD_START'
export const INIT_LOAD_SUCCESS = 'INIT_LOAD_SUCCESS'
export const INIT_LOAD_ERROR = 'INIT_LOAD_ERROR'

export function updateAppStateFromStorage() {
  return ({ dispatch, engine }) => {
    const getPromise = async () => {
      const state = await engine.load();
      if (state.intl && state.intl.currentLocale) {
        dispatch(setCurrentLocale(state.intl.currentLocale));
      } else if (process.env.IS_SERVERLESS) {
        // TODO: Add a reliable client side only locale detection with failback
        // to config defaultLocale.
        dispatch(setCurrentLocale('en'));
      }
    };
    return {
      type: UPDATE_APP_STATE_FROM_STORAGE,
      payload: getPromise()
    };
  };
}

export function initLoad(key, query = '') {
  return ({ fetch }) => {
    const getPromise = async () => {
      const response = await fetch(`http://127.0.0.1:3000/${key}${query}`);
      // console.log('app/actions initLoadSizes response', response);
      if (response.status > 399) throw response;

      const items = response.json();
      // console.log('app/actions initLoadSizes sizes', sizes);
      return items
    }
    return {
      type: INIT_LOAD,
      payload: getPromise(),
      meta: {
        key
      }
    }
  }
}
