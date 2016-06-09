
## Libraries

- [react](http://facebook.github.io/react/)
- [redux](http://rackt.github.io/redux/)
- [babeljs](https://babeljs.io/)
- [immutablejs](http://facebook.github.io/immutable-js)
- [react-router](https://github.com/rackt/react-router)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [react-intl](https://github.com/yahoo/react-intl)
- [redux-storage](https://github.com/michaelcontento/redux-storage)
- [webpack](http://webpack.github.io/)
- [expressjs](http://expressjs.com/)
- [eslint](http://eslint.org/)
- [formatjs](http://formatjs.io/) Universal internationalization.
- [react-helmet](https://github.com/nfl/react-helmet) A document head manager for React.
- [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)
- [chriso/validator.js](https://github.com/chriso/validator.js) For simple yet powerfull Este sync/async validation.
- [bluebird](https://github.com/petkaantonov/bluebird) Because it's better than native implementation.
- [mochajs](https://mochajs.org/) The fun, simple, flexible JavaScript test framework.
- SASS or plain CSS with [autoprefixer](https://github.com/postcss/autoprefixer)
- [shortid](https://github.com/dylang/shortid) Short id generator. Url-friendly. Non-predictable.
- [gulp](http://gulpjs.com/) Aren't NPM scripts better? [No](https://twitter.com/jaffathecake/status/700320306053935104).
- [raven-js](https://github.com/getsentry/raven-js) Crash reporting client for [Sentry](https://getsentry.com).
- [gulp-real-favicon](https://www.npmjs.com/package/gulp-real-favicon) Generate a multiplatform favicon with [RealFaviconGenerator](https://realfavicongenerator.net)
- And much more. Explore the repository.

## Prerequisites

- [node.js](http://nodejs.org) Node 6 with NPM 3 is required.
- [gulp](http://gulpjs.com/) `npm install -g gulp`
- [git](https://git-scm.com/downloads) git cmd tool is required


## Create App

```shell
git clone https://github.com/rkoberg/rihpl.git rihpl-app
cd rihpl-app
npm install
```

## Start Development

- run `gulp`
- point your browser to [localhost:8000](http://localhost:8000)
- build something beautiful

## Dev Tasks

- `gulp` run web app in development mode
- `gulp -p` run web app in production mode
- `gulp mocha` run mocha unit tests
- `gulp mocha-watch` continuous test running for TDD
- `gulp eslint` eslint
- `gulp eslint --fix` fix fixable eslint issues
- `gulp messages-extract` extract messages for translation
- `gulp messages-check` check missing and unused translations
- `gulp favicon` create multiplatform favicon

## Production Tasks

- `gulp build -p` build app for production
- `npm test` run all checks and tests
- `node src/server` start app, remember to set NODE_ENV and SERVER_URL
- `gulp to-html` render app to HTML for static hosting
- `gulp deploy-heroku` deploy [Heroku](https://www.heroku.com/) app
