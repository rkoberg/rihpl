
export const TABLES_BOOTSTRAP = 'TABLES_BOOTSTRAP';
export const TABLES_BOOTSTRAP_START = 'TABLES_BOOTSTRAP_START';
export const TABLES_BOOTSTRAP_SUCCESS = 'TABLES_BOOTSTRAP_SUCCESS';
export const TABLES_BOOTSTRAP_ERROR = 'TABLES_BOOTSTRAP_ERROR';

export const TABLES_LOAD = 'TABLES_LOAD';
export const TABLES_LOAD_START = 'TABLES_LOAD_START';
export const TABLES_LOAD_SUCCESS = 'TABLES_LOAD_SUCCESS';
export const TABLES_LOAD_ERROR = 'TABLES_LOAD_ERROR';

export const PAGE_TABLE = 'PAGE_TABLE';

export function bootstrap(tableName) {


  return ({ apiBaseUrl, fetch, getState }) => {

    const targetState = getState()[tableName];
    if (targetState.meta && targetState.meta.columns.size)
      return {
        type: 'DEV_NULL'
      };

    const getPromise = async () => {
      const response = await fetch(`${apiBaseUrl}/${tableName}`, {
        method: 'OPTIONS',
      });
      if (response.status > 399) throw response;

      const items = response.json();
      return items;
    };
    return {
      type: TABLES_BOOTSTRAP,
      payload: getPromise(),
      meta: {
        key: tableName
      }
    };
  };
}

export function load(tableName, targetState, nextActivePage = null, query = {}) {
  return ({ apiBaseUrl, fetch }) => {

    const activePage = nextActivePage ? nextActivePage : targetState.activePage;

    const startItem = ((activePage - 1) * targetState.rangeSize);
    const endItem = (startItem + targetState.rangeSize) - 1;
    const sortBy = query.sortBy || targetState.sortBy;

    let totalItems = 0;

    const getPromise = async () => {
      const response = await fetch(`${apiBaseUrl}/${tableName}?order=${sortBy}`, {
        method: 'GET',
        headers: {
          'Range-Unit': tableName,
          Range: `${startItem}-${endItem}`
        }
      });
      if (response.status > 399) throw response;
      // 0-10/1025
      const contentRange = response.headers.get('content-range').split('/');
      totalItems = contentRange[1];
      const items = response.json();
      return items;
    };
    return {
      type: TABLES_LOAD,
      payload: getPromise().then(items => ({
        activePage,
        items,
        query,
        totalItems,
      })),
      meta: {
        key: tableName,
      }
    };
  };
}

export function pageTable(tableName, targetState, activePage = null, query = null) {
  return ({ dispatch }) => {
    return {
      type: PAGE_TABLE,
      payload: targetState.preloaded ? null : dispatch(load(tableName, targetState, activePage)),
      meta: {
        tableName,
        activePage
      }
    };
  };
}
