const express = require('express')
const router = express.Router()
const service = require('./service')
const validate = require('../middleware/validate-middleware')
const validator = require('./validator')

// discount
router.get('/discountes', (req, res, next) => {
  service.getAll(req.query.cityId ? req.query.cityId : req.query.companyId, req.query.cityId ? 'cityId' : 'companyId')
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.get('/discount/:id', (req, res, next) => {
  service.getOne(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})
router.put('/discount/:id/image', (req, res, next) => {
  service.addImage(req.params.id, req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.post('/discount', (req, res, next) => {
  service.create(req.body)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.put('/discount/:id', (req, res, next) => {
  service.update(req.body, req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.delete('/discount/:id', (req, res, next) => {
  service.delete(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router
