  /**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  new: function (req, res) {
    res.locals.scripts = ['js/others/signin.js'];
    return res.view('session/new');
  },

  create: function (req, res) {
    var params = req.allParams();
    if (!params.email || !params.password) {
      return res.send(400, 'Missing email or password!');
    }
    Users.findOne({email: params.email}).exec(function (err, user) {
      /* istanbul ignore next */
      if (err) return res.negotiate(err);
      if (!user) {
        return res.send(404, 'Email is not found!');
      } else {
        user.validatePassword(params.password, function (err, valid) {
          if (err) return res.negotiate(err);
          if (valid) {
            return res.ok('Login successfully!');
          } else {
            return res.send(400, 'Wrong password!');
          }
        });
      }
    });
  }

};
