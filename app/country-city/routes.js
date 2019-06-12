const express = require('express')
const router = express.Router()
const service = require('./service')
const validate = require('../middleware/validate-middleware')
const validator = require('./validator')

// country
router.get('/countries', (req, res, next) => {
  service.getAll('Country', null, req.query.search)
    .then((data) => {
      res.json(req.query.res ? {countries : data} : data)
    })
    .catch(next)
})

router.get('/country/:id', (req, res, next) => {
  service.getOne(req.params.id, 'Country')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.post('/country', (req, res, next) => {
  service.create(req.body, 'Country')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.put('/country/:id', (req, res, next) => {
  service.update(req.body, req.params.id, 'Country')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.delete('/country/:id', (req, res, next) => {
  service.delete(req.params.id, 'Country')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

// city
router.get('/cities', (req, res, next) => {
  service.getAll('City', req.query.countryId, req.query.search, next)
    .then((data) => {
      res.json(req.query.res ? {cities: data} : data)
    })
    .catch(next)
})

router.get('/city/:id', (req, res, next) => {
  service.getOne(req.params.id, 'City')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.post('/city', (req, res, next) => {
  service.create(req.body, 'City')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.put('/city/:id', (req, res, next) => {
  service.update(req.body, req.params.id, 'City')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.delete('/city/:id', (req, res, next) => {
  service.delete(req.params.id, 'City')
    .then((data) => {
      res.json(data)
    })
    .catch(next)
})

module.exports = router
