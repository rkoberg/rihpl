

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.API_DB_NAME,
      user: process.env.API_DB_USER,
      password: process.env.API_DB_PASSWORD
    },
    migrations: {
      directory: `${process.env.BASE_PATH}/db/migrations`
    },
    seeds: {
      directory: `${process.env.BASE_PATH}/db/seeds`
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

};
