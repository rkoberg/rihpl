import knexConfig from './knexfile'
import Knex from 'knex'
import Bookshelf from 'bookshelf'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

export const knex = Knex(knexConfig[env])

const bookshelf = Bookshelf(knex)

export default bookshelf;
