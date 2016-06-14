import types from './types'

import fetch from 'isomorphic-fetch'
import express from 'express'

import config from '../../../config'

const {api: {host, port}} = config

const _cache = {}

const cacheables = [
  {name: 'types'},
  {name: 'sizes'},
  // {name: 'regions'},
  {name: '', key: 'tables'},
]

const getApiUrl = (pathname) => `http://${host}:${port}/${pathname}?order=name`

//{
//  const url = new URL(`http://${host}:${port}/${pathname}`)
//  const params = {order: 'name'}
//  Object.keys(params).map((key, value) => url.searchParams.append(key, value))
//  return url
//}


const load = () => {
  cacheables
    .map(cacheable => {
      const cacheKey = cacheable.key ? cacheable.key : cacheable.name

      if (!_cache[cacheKey])
        fetch(getApiUrl(cacheable.name))
          .then(response => response.json())
          .then(items => {
            _cache[cacheKey] = {}
            _cache[cacheKey].map = {}
            items.map(item => {
              const key = item.id ? item.id : item.name
              _cache[cacheKey].map[key] = item
            })
          })
          .catch(err => {
            console.error(err)
            throw err
          })
    })
}

load()

const app = express()
app.use('/types', types)


export const getCache = () => _cache

export default app
