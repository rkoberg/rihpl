import args from './support/args'
import gulp from 'gulp'
import { execSync } from 'child_process'

gulp.task('api', ['env'], () => {
  const config = require('../config')
  console.log('gulp api - config', config)

  const {api: {db, port}} = config
  console.log('gulp api - port', port)
  console.log('gulp api - running', `postgrest postgres://${db.user}:${db.password}@${db.host}:${db.port}/${db.name} -a ${db.startRole} -s public -p ${port}`)
  const history = execSync(`postgrest postgres://${db.user}:${db.password}@${db.host}:${db.port}/${db.name} -a ${db.startRole} -s public -p ${port}`, {stdio:[0,1,2]})
})
