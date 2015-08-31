/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req, res) {
    return res.redirect('/overview');
  },
	overview: function (req, res) {
    return res.view('dashboard/overview');
  }
};

