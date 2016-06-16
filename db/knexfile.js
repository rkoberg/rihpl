

const config = require('../config.js')

console.log('knexfile config', config)

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: config.api.db.name,
      user: config.api.db.user,
      password: config.api.db.password
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'rihpl',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'rihpl',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
