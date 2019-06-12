const express = require('express')
const router = express.Router()
const service = require('./service')
const validate = require('../middleware/validate-middleware')
const validator = require('./validator')

// mechanism
router.get('/places', (req, res, next) => {
  service.getAll(req.query.cityId, req.query.search, next)
    .then((data) => {
      res.json(req.query.res ? {places: data} : data)
    })
    .catch(next)
})

router.get('/place/:id', (req, res, next) => {
  service.getOne(req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.post('/place', (req, res, next) => {
  service.create(req.body)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})
router.put('/place/:id/image', (req, res, next) => {
  service.addImage(req.params.id, req.body, next)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})
router.put('/place/:id/rate', (req, res, next) => {
  service.addRate(req.params.id, req.body)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.put('/place/:id', (req, res, next) => {
  service.update(req.body, req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.delete('/place/:id', (req, res, next) => {
  service.delete(req.params.id)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

module.exports = router
