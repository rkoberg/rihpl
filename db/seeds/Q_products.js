
const items = require('../seed-data/products.json')
const TABLE_NAME = 'products'

items.unshift(TABLE_NAME)

exports.seed = function (knex, Promise) {

  return Promise
    .map(items, function (item) {
      if (item === TABLE_NAME)
        // Deletes ALL existing entries
        return knex(TABLE_NAME).del()
      else
        // Inserts seed entries
        return knex(TABLE_NAME)
          .insert({
            id: item.id,
            name: item.name,
            vintage: item.vintage,
            saleprice: item.saleprice,
            listprice: item.listprice,
            quantity: item.quantity,
            type_id: item.type,
            size_id: item.size,
            // regions: item.regions
          })
    })
    .catch(err => {
      console.error('ERROR products:', err)
    })
}
