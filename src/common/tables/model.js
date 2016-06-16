
import Immutable from 'immutable'

const MetaColumnDef = Immutable.Record({
  references: null,
  default: null,
  precision: null,
  updatable: true,
  schema: '',
  name: '',
  type: '',
  maxLen: 255,
  enum: Immutable.List(),
  nullable: false,
  position: 0
})

const MetaTableDef = Immutable.Record({
  pkey: Immutable.List(),
  columns: Immutable.Map(),
})

export const TableInitialState = Immutable.Record({
  activePage: 1,
  currentItems: Immutable.List(),
  map: Immutable.Map(),
  meta: MetaTableDef(),
  name: '',
  preloaded: false,
  rangeSize: 10,
  sortBy: 'name',
  sortOrder: 'asc',
  totalItems: 0,
})

export const setMeta = metaJson => metaJson ?
  MetaTableDef({
    pkey: Immutable.List(metaJson.pkey),
//    columns: Immutable.List(metaJson.columns.map(col => MetaColumnDef(col)))
    columns: metaJson.columns.length ?
      Immutable.List(metaJson.columns.map(col => MetaColumnDef(col))) :
      Immutable.List()
  }) :
  MetaTableDef()

export const initializeTableState = (state, tableItem, tableName, isPreloaded = false) => {

  const activePage = state.activePage || 1
  const sortBy = state.sortBy || 'name'
  const rangeSize = state.rangeSize || 10

  const startNum = isPreloaded ? ((activePage - 1) * rangeSize) : 0
  const endNum = startNum + rangeSize

  const newMap = Immutable.Map(state.map)
  const currentItems = newMap
    .valueSeq()
    .sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      if (aVal == bVal)
        return 0
      return a[sortBy] > b[sortBy] ? 1 : -1
    })
    .slice(startNum, endNum)

  return new TableInitialState()
    .set('activePage', activePage)
    .set('currentItems', currentItems)
    .set('map', newMap)
    .set('meta', setMeta(state.meta))
    .set('name', tableName)
    .set('preloaded', isPreloaded)
    .set('rangeSize', rangeSize)
    .set('sortBy', sortBy)
    .set('totalItems', state.totalItems || Object.keys(state.map).length)
}

export const setupPageTable = (state, activePage, totalItems) => {
  const sortBy = state.sortBy || 'name'
  const startNum = ((activePage - 1) * state.rangeSize)
  const endNum = startNum + state.rangeSize
  return state
    .set('activePage', activePage)
    .set('totalItems', totalItems || state.totalItems)
    .set('currentItems', state.map
      .valueSeq()
      .sort((a, b) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]
        if (aVal == bVal)
          return 0
        return a[sortBy] > b[sortBy] ? 1 : -1
      })
      .slice(startNum, endNum)
    )
}
