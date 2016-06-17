
exports.up = function (knex, Promise) {
  return Promise.all([

    knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),

    knex.schema.createTable('types', function (table) {
      // table.increments();
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name').notNullable();

      table.index('name', 'types_name_idx');
    }),
    knex.schema.createTable('sizes', function (table) {
      // table.increments();
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name').notNullable();
      table.integer('grams').notNullable();

      table.index('name', 'sizes_name_idx');
    }),
    knex.schema.createTable('regions', function (table) {
      // table.increments();
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('parent_id')
        .nullable()
        .unsigned()
        .references('regions.id');

      table.string('name').notNullable();
      table.integer('level');

      table.index('name', 'regions_name_idx');
      table.index('parent_id', 'regions_parent_idx');
    }),

    knex.schema.createTable('product_regions', function (table) {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.uuid('product_id')
        .notNullable()
        .unsigned()
        .references('products.id');

      table.uuid('region_id')
        .notNullable()
        .unsigned()
        .references('regions.id');


      table.index('product_id', 'product_regions_product_idx');
      table.index('region_id', 'product_regions_region_idx');
    }),

    knex.schema.createTable('products', function (table) {
      // table.increments();
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.integer('vintage');
      table.integer('saleprice');
      table.integer('listprice');
      table.integer('quantity');
      table.uuid('type_id')
        .references('types.id');

      table.uuid('size_id')
        .references('sizes.id');


      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.index('name', 'products_name_idx');
      table.index('vintage', 'products_vintage_idx');
      table.index('saleprice', 'products_saleprice_idx');
      // table.index('regions', 'products_regions_idx', 'gin');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('product_regions'),
    knex.schema.dropTableIfExists('products'),
    knex.schema.dropTableIfExists('types'),
    knex.schema.dropTableIfExists('sizes'),
    knex.schema.dropTableIfExists('regions'),
    knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'),
  ]);
};

// TODO: http://anders.com/cms/456
// creates data type for arrays of uuid
/*

 CREATE OPERATOR CLASS _uuid_ops DEFAULT FOR TYPE _uuid USING gin AS
 OPERATOR 1 &&(anyarray, anyarray),
 OPERATOR 2 @>(anyarray, anyarray),
 OPERATOR 3 <@(anyarray, anyarray),
 OPERATOR 4 =(anyarray, anyarray),
 FUNCTION 1 uuid_cmp(uuid, uuid),
 FUNCTION 2 ginarrayextract(anyarray, internal, internal),
 FUNCTION 3 ginqueryarrayextract(anyarray, internal, smallint, internal, internal, internal, internal),
 FUNCTION 4 ginarrayconsistent(internal, smallint, anyarray, integer, internal, internal, internal, internal),
 STORAGE uuid;

 */
