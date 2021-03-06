const express = require('express')
const router = express.Router()
const userService = require('./service')
const validate = require('../middleware/validate-middleware')
const userValidator = require('./validator')

router.get('/users', (req, res, next) => {
    userService.getAllUsers(next).then((data) => {
      res.json(req.query.res ? {users : data} : data)
    })
    .catch(next)
})
router.post('/login', userValidator.getUserProfile, (req, res, next) => {
    userService.getUserProfile(req.body).then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.post('/registration', userValidator.createUserProfile, (req, res, next) => {
    userService.createUserProfile(req.body)
    .then(() => {
      return userService.getUserProfile(req.body)
    })
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.get('/user/:id', (req, res, next) => {
    userService.getUserProfile(req.body, req.params.id).then((data) => {
      res.json(data)
    })
    .catch(next)
})
router.put('/user/:id', userValidator.updateUserProfile, (req, res, next) => {
    userService.updateUserProfile(req.body, req.params.id).then((data) => {
      res.json(data)
    })
    .catch(next)
})
router.put('/user/:id/image', (req, res, next) => {
    userService.addImage(req.body, req.params.id, next).then((data) => {
      res.json(data)
    })
    .catch(next)
})

router.delete('/user/:id', (req, res, next) => {
    userService.deleteUser(req.params.id).then((data) => {
      res.json(data)
    })
    .catch(next)
})

module.exports = router