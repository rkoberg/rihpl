
import config from '../../config';
import knexConfig from './knexfile';
import Knex from 'knex';

const env = config.isProduction ? 'production' : 'development';

const knex = Knex(knexConfig[env]);
