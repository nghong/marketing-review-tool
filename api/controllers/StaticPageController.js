/**
 * StaticPageController
 *
 * @description :: Server-side logic for managing Staticpages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    /* istanbul ignore next */
    return res.view('homepage')
  }
}

