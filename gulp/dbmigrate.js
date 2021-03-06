import args from './support/args';
import gulp from 'gulp';
// import { execSync } from 'child_process'

gulp.task('dbmigrate', ['env'], done => {
//  const promise = execSync(`knex migrate:latest --knexfile=db/knexfile.js`)

  var config = require('../config');
  console.log('gulp dbmigrate - config', config);
  var knexConfig = require('../db/knexfile');
  console.log('gulp dbmigrate - knexConfig', knexConfig);
  var environment = process.env.NODE_ENV;
  var knex = require('knex')(knexConfig[environment]);

  (async () => {
    try {
      await knex.migrate.latest([knexConfig]);
    } catch (err) {
      throw err;
    } finally {
      done();
    }
  })();

});
