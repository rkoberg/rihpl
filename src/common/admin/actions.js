import ValidationError from '../lib/validation/ValidationError'
import { browserHistory } from 'react-router'

export const TOGGLE_OFFCANVAS = 'TOGGLE_OFFCANVAS'

export const ADMIN_BOOTSTRAP = 'ADMIN_BOOTSTRAP'
export const ADMIN_BOOTSTRAP_START = 'ADMIN_BOOTSTRAP_START'
export const ADMIN_BOOTSTRAP_SUCCESS = 'ADMIN_BOOTSTRAP_SUCCESS'
export const ADMIN_BOOTSTRAP_ERROR = 'ADMIN_BOOTSTRAP_ERROR'

export function toggleOffcanvas() {
  return () => {
    return {
      type: TOGGLE_OFFCANVAS
    }
  }
}

export function bootstrap(tableName) {
  return ({fetch, getState}) => {

    const targetState = getState()[tableName]
//    console.log('admin/actions bootstrap targetState', targetState.toJS())
//    console.log('admin/actions bootstrap targetState.meta.columns.size', targetState.meta.columns.size)
//
    if (targetState.meta.columns.size)
      return {
        type: 'DEV_NULL'
      }

    const getPromise = async () => {
      const response = await fetch(`http://127.0.0.1:3000/${tableName}`, {
        method: 'OPTIONS',
      })
      if (response.status > 399) throw response

      const items = response.json()
//      console.log('admin/actions bootstrap items', items);
      return items
    }
    return {
      type: ADMIN_BOOTSTRAP,
      payload: getPromise(),
      meta: {
        key: tableName
      }
    }
  }
}
