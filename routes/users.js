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
// router.get('/:id', funtion (req, res) {
//
// })

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
const getUserNames = (users) => (users.map((user) => user.name))

module.exports = router
