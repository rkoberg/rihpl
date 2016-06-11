/* eslint-disable no-console */
import fs from 'fs'
import gulp from 'gulp'
import PostgresSchema from 'pg-json-schema-export'

import config from '../config.js'

const connection = {
  user: config.api.db.user,
  password: config.api.db.password,
  host: '127.0.0.1',
  port: 5432,
  database: config.api.db.name
}

gulp.task('exportSchema', done => {
  PostgresSchema
    .toJSON(connection, 'public')
    .then(schemas => fs.writeFile('./db-schema.json', JSON.stringify(schemas), 'utf8', done))
    .catch(err => {
      console.log('PostgresSchema.toJSON error', err)
      throw err
    })
})
