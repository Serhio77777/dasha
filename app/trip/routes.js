const express = require('express')
const router = express.Router()
const service = require('./service')
const validate = require('../middleware/validate-middleware')
const validator = require('./validator')

// mechanism
router.get('/trips', (req, res, next) => {
  service.getAll(req.query.userId, req.query.search, next)
    .then((data) => {
      res.json(req.query.res ? {trips: data} : data)
    })
    .catch(next)
})

router.get('/trip/:id', (req, res, next) => {
  service.getOne(req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.post('/trip', (req, res, next) => {
  service.create(req.body)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})
router.put('/trip/:id/places', (req, res, next) => {
  service.addPlaces(req.body, req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.put('/trip/:id', (req, res, next) => {
  service.update(req.body, req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.delete('/trip/:id', (req, res, next) => {
  service.delete(req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

module.exports = router
