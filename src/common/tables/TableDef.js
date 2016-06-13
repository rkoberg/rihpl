
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
  map: Immutable.OrderedMap(),
  meta: MetaTableDef(),
  preloaded: false,
  rangeSize: 10,
  sortBy: 'name',
  totalItems: 0,
})

export const setMap = (tableItem, mapJson) => Immutable.OrderedMap(
  Object.keys(mapJson)
    .map(key => [key, new tableItem(mapJson[key])])
)

export const loadMap = (tableItem, arrayJson) => arrayJson.map(item => [item.id, new tableItem(item)])


export const setMeta = metaJson => metaJson ?
  MetaTableDef({
    pkey: Immutable.List(metaJson.pkey),
//    columns: Immutable.List(metaJson.columns.map(col => MetaColumnDef(col)))
    columns: metaJson.columns.length ?
      Immutable.List(metaJson.columns.map(col => MetaColumnDef(col))) :
      Immutable.List()
  }) :
  MetaTableDef()
