'use strict'
/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  signup: function (req, res) {
    res.locals.scripts = ['js/others/signup.js']
    return res.view('signup', {title: 'Sign-up for Marketing Review Tool'})
  },

  create: function (req, res) {
    var params = req.allParams()

    // Encrypt a string using the BCrypt algorithm.
    Users.create({
      name: params.name,
      email: params.email,
      password: params.password,
      lastLoggedIn: new Date()
    }, function userCreated (err, newUser) {
      if (err) {
        // console.log('err: ', err)
        // console.log('err.invalidAttributes: ', err.invalidAttributes)

        // If this is a uniqueness error about the email attribute,
        // send back an easily parseable status code.
        if (err.invalidAttributes && err.invalidAttributes.email &&
            err.invalidAttributes.email[0] &&
            err.invalidAttributes.email[0].rule === 'unique') {
          return res.emailAddressInUse()
        }

        // Otherwise, send back something reasonable as our error response.
        /* istanbul ignore next */
        return res.negotiate(err)
      }

      // Log user in
      req.session.me = newUser.id

      // Send back the id of the new user
      return res.json({
        id: newUser.id
      })
    })
  }

}
