import knexConfig from './knexfile'
import Knex from 'knex'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const knex = Knex(knexConfig[env])

export default knex
