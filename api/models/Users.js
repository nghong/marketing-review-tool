'use strict'
/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    lastLoggedIn: {
      type: 'date',
      defaultsTo: new Date()
    }
  },

  setPassword: function (user, callback) {
    if (user.password.length < 6) {
      callback({err: ['Password must have at least 6 characters!']})
    } else {
      bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        user.password = hash
        callback(null, user)
      })
    }
  },

  beforeCreate: function (user, callback) {
    module.exports.setPassword(user, callback)
  }
}

