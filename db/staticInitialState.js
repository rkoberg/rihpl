import Size from '../src/server/model/sizes'

async function getCollection(model) {
  const col = await model.collection().fetch()
  // console.log('getCollection col', col)
  return col.toJSON()
}

function getTypes() {
  return db('types').select('*').then(rows => rows)
}
function getRegions() {
  return db('regions').select('*').then(rows => rows)
}

const sizes = (async () => await getCollection(Size))()
console.log('db/staticInitialState sizes', sizes);


const app = {
  sizes
}

export default app;


