const fs = require('fs')
const path = require('path')
const extend = require('extend')

let localConfig = false

const localConfigPath = path.join(__dirname, 'config.local.js')

try {
  const stats = fs.statSync(localConfigPath)
  localConfig = require(localConfigPath)
} catch (err) {
  console.log('localConfig err', err)
  if(err.code == 'ENOENT')
    localConfig = false
}

const defaultConfig = {
  api: {
    port: 3000,
    host: '127.0.0.1',
    db: {
      name: 'rihpl',
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
}

const config = localConfig ?
  extend(true, {}, defaultConfig, localConfig) :
  defaultConfig

module.exports = config
