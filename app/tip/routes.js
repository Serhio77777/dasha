const express = require('express')
const router = express.Router()
const service = require('./service')
const validate = require('../middleware/validate-middleware')
const validator = require('./validator')

// mechanism
router.get('/tips', (req, res, next) => {
  service.getAll(req.query.cityId)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.get('/tip/:id', (req, res, next) => {
  service.getOne(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.post('/tip', (req, res, next) => {
  service.create(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.put('/tip/:id', (req, res, next) => {
  service.update(req.body, req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.delete('/tip/:id', (req, res, next) => {
  service.delete(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router
