'use strict'
/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Passwords = require('machinepack-passwords')

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
  beforeCreate: function (user, callback) {
    if (user.password.length < 6) {
      callback({err: ['Password must have at least 6 characters!']})
    } else {
      Passwords.encryptPassword({
        password: user.password
      })
      .exec({
        // An unexpected error occurred.
        error: /* istanbul ignore next */ function (err) {
          console.log(err)
          callback(err)
        },
        // OK.
        success: function (result) {
          user.password = result
          callback(null, user)
        }
      })
    }
  }
}

