import gulp from 'gulp';
import requireDir from 'require-dir';

import fs from 'fs'
import path from 'path'

const localConfigPath = path.join(__dirname, 'config.local.js')

try {
  fs.statSync(localConfigPath)
  require(localConfigPath)
} catch (err) {
  console.log('localConfig err', err)
  if(err.code == 'ENOENT')
    localConfig = false
}


requireDir('./gulp', { recurse: false });

// Default task to start development. Just type `gulp`.
gulp.task('default', ['server']);
