import express from 'express'
import fetch from 'isomorphic-fetch'
import config from '../../../config'

const router = express.Router()

let types = false;

router.route('')
  .get((req, res, next) => {
    const { cache } = req.query
    const {api: {host, port}} = config;

    if (!types || cache === 'clear')
      fetch(`http://${host}:${port}/types`)
        .then(response => response.json())
        .then(json => {
          types = json
          res.send(types).end()
        })
        .catch(err => next(err))
    else
      res.send(types).end()

  })

export default router
