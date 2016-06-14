
export const TABLES_BOOTSTRAP = 'TABLES_BOOTSTRAP'
export const TABLES_BOOTSTRAP_START = 'TABLES_BOOTSTRAP_START'
export const TABLES_BOOTSTRAP_SUCCESS = 'TABLES_BOOTSTRAP_SUCCESS'
export const TABLES_BOOTSTRAP_ERROR = 'TABLES_BOOTSTRAP_ERROR'

export const TABLES_LOAD = 'TABLES_LOAD'
export const TABLES_LOAD_START = 'TABLES_LOAD_START'
export const TABLES_LOAD_SUCCESS = 'TABLES_LOAD_SUCCESS'
export const TABLES_LOAD_ERROR = 'TABLES_LOAD_ERROR'

export const PAGE_TABLE = 'PAGE_TABLE'

export function bootstrap(tableName) {
  return ({fetch, getState}) => {

    const targetState = getState()[tableName]
//    console.log('admin/actions bootstrap targetState', targetState.toJS())
//    console.log('admin/actions bootstrap targetState.meta.columns.size', targetState.meta.columns.size)
//
    if (targetState.meta && targetState.meta.columns.size)
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
      type: TABLES_BOOTSTRAP,
      payload: getPromise(),
      meta: {
        key: tableName
      }
    }
  }
}

export function load(tableName, targetState, nextActivePage = null) {
  return ({fetch}) => {

   console.log('admin/actions bootstrap targetState', targetState)
//    console.log('admin/actions bootstrap targetState.meta.columns.size', targetState.meta.columns.size)
//
    const activePage = nextActivePage ? nextActivePage : targetState.activePage

    const startItem = ((activePage - 1) * targetState.rangeSize)
    const endItem = (startItem + targetState.rangeSize) - 1
    console.log('tables/actions load startItem', startItem);
    console.log('tables/actions load endItem', endItem);

    let totalItems = 0

    const getPromise = async () => {
      const response = await fetch(`http://127.0.0.1:3000/${tableName}?order=${targetState.sortBy}`, {
        method: 'GET',
        headers: {
          'Range-Unit': tableName,
          Range: `${startItem}-${endItem}`
        }
      })
      if (response.status > 399) throw response
     // console.log('admin/actions load response.headers', response.headers);

      //0-10/1025
      const contentRange = response.headers.get('content-range').split('/')
      totalItems = contentRange[1]
      // const rangeArr = contentRange[0].split('-')
      // const numPages = Math.ceil(totalItems / rangeArr[1])
      //  activePage = Math.ceil(((rangeArr[0] + 1) / totalItems) * 100)
      const items = response.json()
     console.log('tables/actions load getPromise totalItems', totalItems);
     console.log('tables/actions load getPromise activePage', activePage);
      return items
    }
    return {
      type: TABLES_LOAD,
      payload: getPromise().then(items => ({
        activePage,
        items,
        totalItems
      })),
      meta: {
        key: tableName,
      }
    }
  }
}

export function pageTable(tableName, activePage) {
//  console.log('pageTable tableName', tableName);
 console.log('pageTable activePage', activePage);
  return ({ dispatch, getState }) => {

    const targetState = getState()[tableName]

    return {
      type: PAGE_TABLE,
      payload: targetState.preloaded ? null : dispatch(load(tableName, targetState, activePage)),
      meta: {
        tableName,
        activePage
      }
    }
  }
}
