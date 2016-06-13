import fs from 'fs';
import extend from 'extend';

let localConfig = false;

try {
  const stats = fs.statSync('./config.local.js');
  localConfig = require('./config.local.js');
} catch (err) {
  if(err.code == 'ENOENT')
    localConfig = false;
}

const defaultConfig = {
  api: {
    port: 3000,
    host: '127.0.0.1',
    db: {
      name: 'fwi',
      user: '',
      password: '',
      port: 5432,
      startRole: '',
    }
  },
  app: {
    port: 8000,
    host: '127.0.0.1',
  }
};

export default localConfig ?
  extend(true, {}, defaultConfig, localConfig) :
  defaultConfig;
