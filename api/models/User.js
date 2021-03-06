/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

module.exports = {

  schema: true,

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
    reviewCount: {
      type: 'integer',
      defaultsTo: 0
    },
    posts: {
      collection: 'PostMapping',
      via: 'author'
    },
    reviews: {
      collection: 'PostMapping',
      via: 'reviewers'
    },
    toJSON: function () {
      var user = this.toObject();
      delete user.password;
      delete user.confirmation;
      delete user._csrf;
      return user;
    },
    validatePassword: function (candidatePassword, callback) {
      bcrypt.compare(candidatePassword, this.password, function (err, valid) {
        /* istanbul ignore if */
        if (err) return callback(err);
        callback(null, valid);
      });
    }
  },

  encryptPassword: function (user, callback) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
      /* istanbul ignore if */
      if (err) return callback(err);
      user.password = hash;
      callback(null);
    });
  },

  beforeCreate: function (user, callback) {
    if (user.password.length < 6) {
      return callback({ err: "Password is too short" });
    }
    User.encryptPassword(user, function (err) {
      callback(err);
    });
  },

  beforeUpdate: function (user, callback) {
    if (!user.password) {
      return callback();
    }
    User.encryptPassword(user, function (err) {
      callback(err);
    });
  }
};

