
export const PAGE_TABLE = 'PAGE_TABLE'

export function pageTable(tableName, activePage) {
//  console.log('pageTable tableName', tableName);
//  console.log('pageTable activePage', activePage);
  return ({ dispatch }) => {
    return {
      type: PAGE_TABLE,
      meta: {
        tableName,
        activePage
      }
    }
  }
}
