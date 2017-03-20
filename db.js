module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  addUser: addUser,
  updateUser: updateUser
}

function getUsers (knex) {
  return knex('users').select()
}

function getUser (id, knex) {
  return knex('users').where('id', id)
}

function addUser (name, email, knex) {
  return knex('users').insert({name: name, email: email})
}

function updateUser (id, name, email, knex) {
  return knex('users').where('id', id).update({name: name, email: email})
}
