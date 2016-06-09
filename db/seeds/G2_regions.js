
const items = require('../seed-data/regions.json');
const TABLE_NAME = 'regions';

exports.seed = function(knex, Promise) {

  const levels = {};
  items.map(item => {
    if (!levels[item.level])
      levels[item.level] = [];
    levels[item.level].push(item);
  });

  // sort will work if less than 11 items
  const sortedLevelKeys = Object.keys(levels).sort();

  return Promise
    .map(levels[2], function(item) {
//        console.log(`Level: ${item.level}, id: ${item.id}, parent: ${item.parent}, name: ${item.name}`);
      return knex(TABLE_NAME)
        .insert({
          id: item.id,
          level: item.level,
          name: item.name,
          parent_id: item.parent === 0 ? null : item.parent
        })
        .catch(err => {
          console.error(`Level: ${item.level}, id: ${item.id}, parent: ${item.parent}, name: ${item.name}`);
          console.error('ERROR regions:', err);
        });
    });

};
