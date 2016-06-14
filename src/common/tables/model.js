
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
  preloaded: false,
  rangeSize: 10,
  sortBy: 'name',
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

export const initializeTableState = (state, tableItem, isPreloaded = false) => {

  const sortBy = state.sortBy || 'name'
  const rangeSize = state.rangeSize || 10

  const newMap = Immutable.Map(state.map)
  const currentItems = newMap
    .valueSeq()
    .sort((a, b) => a[sortBy] > b[sortBy])
    .slice(0, rangeSize)

  return new TableInitialState()
    .set('activePage', state.activePage || 1)
    .set('currentItems', currentItems)
    .set('map', newMap)
    .set('meta', setMeta(state.meta))
    .set('preloaded', isPreloaded)
    .set('rangeSize', rangeSize)
    .set('sortBy', sortBy)
    .set('totalItems', state.totalItems || Object.keys(state.map).length)
}
