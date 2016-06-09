const fs = require('fs');

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
  }
};

module.exports = localConfig ? Object.assign({}, defaultConfig, localConfig) : defaultConfig;

