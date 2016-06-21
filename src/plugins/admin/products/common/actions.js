
export const TABLE_NAME = 'products';
export const TABLE_NAME_SINGULAR = 'product';



export const LOAD = 'LOAD';
export const LOAD_START = 'LOAD_START';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_ERROR = 'LOAD_ERROR';

export const PAGE_TABLE = 'PAGE_TABLE';

export const GET_BY_ID = 'GET_BY_ID';
export const GET_BY_ID_START = 'GET_BY_ID_START';
export const GET_BY_ID_SUCCESS = 'GET_BY_ID_SUCCESS';
export const GET_BY_ID_ERROR = 'GET_BY_ID_ERROR';

export const CREATE_OR_UPDATE = 'CREATE_OR_UPDATE';
export const CREATE_OR_UPDATE_START = 'CREATE_OR_UPDATE_START';
export const CREATE_OR_UPDATE_SUCCESS = 'CREATE_OR_UPDATE_SUCCESS';
export const CREATE_OR_UPDATE_ERROR = 'CREATE_OR_UPDATE_ERROR';

export function load(targetState, nextActivePage = null, query = {}) {
  return ({ apiBaseUrl, fetch }) => {

    const activePage = nextActivePage ? nextActivePage : targetState.activePage;

    const startItem = ((activePage - 1) * targetState.rangeSize);
    const endItem = (startItem + targetState.rangeSize) - 1;
    const sortBy = query.sortBy || targetState.sortBy;

    let totalItems = 0;

    const getPromise = async () => {
      const response = await fetch(`${apiBaseUrl}/${TABLE_NAME}?order=${sortBy}&select=*,regions{*}`, {
        method: 'GET',
        headers: {
          'Range-Unit': TABLE_NAME,
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
      type: LOAD,
      payload: getPromise()
        .then(items => ({
          activePage,
          items,
          query,
          totalItems,
        })),
    };
  };
}

export function pageTable(targetState, activePage = null, query = null) {
  return ({ dispatch }) => {
    return {
      type: PAGE_TABLE,
      payload: targetState.preloaded ? null : dispatch(load(targetState, activePage)),
    };
  };
}

export function getById(id) {
  return ({ apiBaseUrl, fetch }) => {
    const getPromise = async () => {
      const response = await fetch(`${apiBaseUrl}/${TABLE_NAME}?id=eq.${id}&select=*,regions{*}`, {
        method: 'GET',
        headers: {
          Prefer: 'plurality=singular'
        }
      });

//      console.log('tables/actions getById response', response)
      if (response.status > 399) throw response;
      const items = response.json();
      return items;
    };
    return {
      type: GET_BY_ID,
      payload: getPromise(),
    };
  }
}

export function createOrUpdate(data) {
  return ({ apiBaseUrl, fetch }) => {
    const getPromise = async () => {

      const url = data.id ? `${apiBaseUrl}/${TABLE_NAME}?id=eq.${data.id}` : `${apiBaseUrl}/${TABLE_NAME}`;

      const response = await fetch(url, {
        method: data.id ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify(data)
      });
      if (response.status > 399) throw response;
      const items = response.json();
      return items;
    };
    return {
      type: CREATE_OR_UPDATE,
      payload: getPromise(),
    };
  }
}
