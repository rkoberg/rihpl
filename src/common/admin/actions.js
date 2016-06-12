import ValidationError from '../lib/validation/ValidationError'
import { browserHistory } from 'react-router'

export const TOGGLE_OFFCANVAS = 'TOGGLE_OFFCANVAS'

export const ADMIN_INIT_LOAD = 'ADMIN_INIT_LOAD'
export const ADMIN_INIT_LOAD_START = 'ADMIN_INIT_LOAD_START'
export const ADMIN_INIT_LOAD_SUCCESS = 'ADMIN_INIT_LOAD_SUCCESS'
export const ADMIN_INIT_LOAD_ERROR = 'ADMIN_INIT_LOAD_ERROR'

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

export function initLoad(key = '', query = '') {
  return ({ fetch }) => {
    const getPromise = async () => {
      const response = await fetch(`http://127.0.0.1:3000/${key}${query}`)
      // console.log('app/actions initLoadSizes response', response);
      if (response.status > 399) throw response

      const items = response.json()
      // console.log('app/actions initLoadSizes sizes', sizes);
      return items
    }
    return {
      type: ADMIN_INIT_LOAD,
      payload: getPromise(),
      meta: {
        key
      }
    }
  }
}

export function bootstrap() {
  return ({fetch, getState}) => {

    const pathname = getState().routing.locationBeforeTransitions.pathname
    const tableName = pathname.split('/').pop();
//    console.log('admin/actions bootstrap pathname', pathname);

    const getPromise = async () => {
      const response = await fetch(`http://127.0.0.1:3000/${tableName}`, {
        method: 'OPTIONS',
      })
      // console.log('app/actions initLoadSizes response', response);
      if (response.status > 399) throw response

      const items = response.json()
      // console.log('admin/actions initLoadSizes sizes', sizes);
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
