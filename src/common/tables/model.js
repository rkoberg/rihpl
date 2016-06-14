
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
  currentSet: Immutable.List(),
  list: Immutable.List(),
  meta: MetaTableDef(),
  preloaded: false,
  rangeSize: 10,
  sortBy: 'name',
  totalItems: 0,
})

export const setList = (tableItem, arrayJson) => Immutable.List(
  arrayJson.map(item => new tableItem(item))
)

export const loadList = (tableItem, arrayJson) => arrayJson.map(item => new tableItem(item))


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
  return new TableInitialState()
    .set('activePage', state.activePage)
    .set('list', setList(tableItem, state.list))
    .set('meta', setMeta(state.meta))
    .set('preloaded', isPreloaded)
    .set('rangeSize', state.rangeSize)
    .set('sortBy', state.sortBy)
    .set('totalItems', state.totalItems)
}
