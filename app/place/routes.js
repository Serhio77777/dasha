const express = require('express')
const router = express.Router()
const service = require('./service')
const validate = require('../middleware/validate-middleware')
const validator = require('./validator')

// mechanism
router.get('/places', (req, res, next) => {
  service.getAll(req.query.cityId)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.get('/place/:id', (req, res, next) => {
  service.getOne(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.post('/place', (req, res, next) => {
  service.create(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})
router.put('/place/:id/image', (req, res, next) => {
  service.addImage(req.params.id, req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})
router.put('/place/:id/rate', (req, res, next) => {
  service.addRate(req.params.id, req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.put('/place/:id', (req, res, next) => {
  service.update(req.body, req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.delete('/place/:id', (req, res, next) => {
  service.delete(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router
