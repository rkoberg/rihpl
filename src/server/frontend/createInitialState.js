import config from '../config'
import loadMessages from '../intl/loadMessages'

const messages = loadMessages()

/*
//import Promise from 'bluebird'

import fetch from 'isomorphic-fetch';

let sizes;
let types;

const getPromise = async (tableName) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/sizes`);
    if (response.status > 399) throw response;
    return response.json();
  } catch (error) {
    throw error;
  }
};

const createInitialData = async () => {
  const [_sizes, _types] = await Promise
    .all([
      getPromise('sizes'),
//      getPromise('types'),
    ])
  sizes = _sizes;
//  types = _types;
}

createInitialData();
*/

export default function createInitialState() {
  return {
    config: {
      appName: config.appName,
      appVersion: config.appVersion,
      firebaseUrl: config.firebaseUrl,
      sentryUrl: config.sentryUrl
    },
    intl: {
      currentLocale: config.defaultLocale,
      defaultLocale: config.defaultLocale,
      locales: config.locales,
      messages
    }
  }
}
