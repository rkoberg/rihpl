import args from './support/args';
import gulp from 'gulp';
import { execSync } from 'child_process';

import fs from 'fs';
import path from 'path';

gulp.task('env', () => {

  const localConfigPath = path.join(__dirname, '..', 'config.local.js');

  try {
    fs.statSync(localConfigPath);
    require(localConfigPath);
    console.log('gulp env - found config.local.js at', localConfigPath);
  } catch (err) {
    console.log('localConfig err', err);
    if (err.code == 'ENOENT')
      console.log('gulp env - No config.local.js found at project root.');
  }


  process.env.NODE_ENV = args.production ? 'production' : 'development';
  // The app is not a library, so it doesn't make sense to use semver.
  // Este uses appVersion for crash reporting to match bad builds easily.
  const gitIsAvailable = !process.env.SOURCE_VERSION; // Heroku detection.
  if (gitIsAvailable) {
    process.env.appVersion = execSync('git rev-parse HEAD').toString().trim();
  }
});
