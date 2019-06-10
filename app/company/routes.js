const express = require('express')
const router = express.Router()
const service = require('./service')
const validate = require('../middleware/validate-middleware')
const validator = require('./validator')

// mechanism
router.get('/companies', (req, res, next) => {
  service.getAll(next)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.get('/company/:id', (req, res, next) => {
  service.getOne(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.post('/company', (req, res, next) => {
  service.create(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.put('/company/:id', (req, res, next) => {
  service.update(req.body, req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})
router.put('/company/:id/image', (req, res, next) => {
  service.addImage(req.body, req.params.id, next)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.delete('/company/:id', (req, res, next) => {
  service.delete(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router
