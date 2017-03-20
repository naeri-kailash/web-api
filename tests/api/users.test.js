// Note: we use AVA here because it makes setting up the
// conditions for each test relatively simple. The same
// can be done with Tape using a bit more code.

var test = require('ava')
var request = require('supertest')

var app = require('../../server')
var setupDb = require('../setup_db')

setupDb(test, function (db) {
  app.set('knex', db)
})

test.cb('getUsers gets all users', function (t) {
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err
      t.is(26, res.body.users.length)
      t.end()
    })
})
test.cb('getUser gets info about single user', function (t) {
  request(app)
    .get('/users/99901')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) throw err
      t.is('Ambitious Aardvark', res.body[0].name)
      t.end()
    })
})
test.cb('getUsers gets a list of usernames', function (t) {
  request(app)
  .get('/users/names')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function (err, res) {
    if (err) throw err
    t.is('Zaftig Zebu', res.body.users[25].name)
    t.end()
  })
})
test.cb('addUser adds a new user to the db', function (t) {
  request(app)
  .post('/users/addUser')
  .set('Content-Type', 'application/json')
  .send('{"name":"Bob", "email":"bob@gmail.com"}')
  .end(function (err, res) {
    if (err) console.log(err.message)
    t.is('Bob', res.body[0].name)
    t.end()
  })
})
