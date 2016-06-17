import args from './support/args'
import gulp from 'gulp'
//import { execSync } from 'child_process'

gulp.task('dbseed', ['env'], done => {
//  execSync(`knex seed:run --knexfile=db/knexfile.js`)

  var config = require('../config')
  console.log('gulp dbmigrate - config', config);
  var knexConfig = require('../db/knexfile');
  console.log('gulp dbmigrate - knexConfig', knexConfig);
  var environment = process.env.NODE_ENV
  var knex = require('knex')(knexConfig[environment]);

  (async () => {
    try {
      await knex.seed.run([knexConfig])
    } catch (err) {
      throw err
    } finally {
      done()
    }
  })()

})
