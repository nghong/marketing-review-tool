'use strict'
/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  signup: function (req, res) {
    return res.view('signup', {title: 'Sign-up for Marketing Review Tool'})
  },

	create: function (req, res) {
    
  }
}
