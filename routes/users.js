var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', function (req, res) {
  db.getUsers(req.app.get('knex'))
    .then(function (users) {
      res.send({ users: users })
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})
router.get('/:id', function (req, res) {
  const userId = Number(req.params.id)
  console.log(userId)
  db.getUsers(req.app.get('knex'))
    .then(function (users) {
      return users.filter((user) => (user.id === userId))
    })
    .then(function (user) {
      res.send(user)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})
router.get('/usernames', function (req, res) {
  db.getUsers(req.app.get('knex'))
    .then(getUserNames)
    .then(function (users) {
      res.send(users)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})
router.post('/addUser', function (req, res) {
  const name = req.body.name
  const email = req.body.email
  db.addUser(name, email, req.app.get('knex'))
    .then(function () {
      res.send('Added to database')
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})
router.put('/updateUser', function (req, res) {
  const id = req.body.id
  const name = req.body.name
  const email = req.body.email
  console.log(req.body)
  db.updateUser(id, name, email, req.app.get('knex'))
    .then(function () {
      res.send('Updated user')
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})


const getUserNames = (users) => (users.map((user) => user.name))

module.exports = router
