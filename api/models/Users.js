'use strict'
/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt')
var uuid = require('node-uuid')
var _ = require('lodash')
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
    },
    reviewCount: {
      type: 'integer',
      defaultsTo: 0
    },
    sessionTokens: {
      type: 'array'
    },
    toJSON: function () {
      var user = this.toObject()
      delete user.password
      delete user.confirmation
      delete user.sessionTokens
      delete user._csrf
      return user
    }
  },

  validatePassword: function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, valid) {
      if (err) return callback(err)
      callback(null, valid)
    })
  },

  encryptPassword: function (user, callback) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
      if (err) return callback(err)
      user.password = hash
      callback(null)
    })
  },

  issueSessionToken: function (user, callback) {
    if (!user || typeof user === 'function') return callback('A user model must be supplied!')

    if (!user.sessionTokens) {
      user.sessionTokens = []
    }

    var token = uuid.v4()

    user.sessionTokens.push({
      token: token,
      issuedAt: new Date()
    })

    user.save(function (err) {
      callback(err)
    })
  },

  consumeSessionToken: function (token, callback) {
    if (!token || typeof token === 'function') return callback('A token must be supplied')

    Users.findOne({ 'sessionTokens': token }).exec(function (err, user) {
      if (err) return callback(err)
      if (!user) return callback(null, false)

      if (user.sessionTokens) {
        user.sessionTokens.forEach(function (sessionToken, index) {
          if (sessionToken === token) {
            delete user.sessionTokens[index]
          }
        })
      }

      // Remove falsy tokens
      user.sessionTokens = _.compact(user.sessionTokens)

      user.save(function (err) {
        return callback(err, user)
      })
    })
  },

  beforeCreate: function (user, callback) {
    if (!user.password || user.password !== user.passwordConfirmation) {
      return callback({ err: "Password doesn't match confirmation!" })
    }
    Users.encryptPassword(user, function (err) {
      callback(err)
    })
  },

  beforeUpdate: function (user, callback) {
    if (!user.password) {
      return callback()
    }
    Users.encryptPassword(user, function (err) {
      callback(err)
    })
  }
}

