/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function (req, res) {
    res.locals.scripts = ['../js/others/newPost.js'];
    return res.view('post/new');
  }
};

