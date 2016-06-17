
import cache from './cache';
import config from './config';
import errorHandler from './lib/errorHandler';
import express from 'express';
import frontend from './frontend';

const app = express();

app.use('/cache', cache);
app.use(frontend);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server started at http://localhost:${config.port}`);
});
