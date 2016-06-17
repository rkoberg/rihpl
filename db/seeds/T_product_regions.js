
const items = require('../seed-data/product_regions.json');
const TABLE_NAME = 'product_regions';

items.unshift(TABLE_NAME);

// TODO: CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

exports.seed = function (knex, Promise) {

  return Promise
    .map(items, function (item) {
      if (item === TABLE_NAME)
        // Deletes ALL existing entries
        return knex(TABLE_NAME).del();
      else
        // Inserts seed entries
        return knex(TABLE_NAME)
          .insert({
            product_id: item.product,
            region_id: item.region
          });
    })
    .catch(err => {
      console.error('ERROR product_regions:', err);
    });
};
