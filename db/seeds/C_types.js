
const items = require('../seed-data/types.json');
const TABLE_NAME = 'types';

items.unshift(TABLE_NAME);

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
            id: item.id,
            name: item.name
          });
    })
    .catch(err => {
      console.error('ERROR types:', err);
    });
};
