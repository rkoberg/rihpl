

process.env.BASE_PATH = __dirname

const config = {
  api: {
    port: process.env.API_PORT || 3000,
    host: process.env.API_HOST || '127.0.0.1',
    scheme: process.env.API_SCHEME || 'http',
    db: {
      host: process.env.API_DB_HOST || '127.0.0.1',
      name: process.env.API_DB_NAME || 'rihpl',
      password: process.env.API_DB_PASSWORD || '',
      port: process.env.API_DB_PORT || 5432,
      startRole: process.env.API_DB_START_ROLE || '',
      user: process.env.API_DB_USER || '',
    }
  },
  app: {
    port: process.env.APP_PORT || 8000,
    host: process.env.APP_HOST || '127.0.0.1',
    scheme: process.env.APP_SCHME || 'http',
  }
}
module.exports = config
