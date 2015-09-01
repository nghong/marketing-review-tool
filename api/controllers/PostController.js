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
  },
  create: function (req, res) {
    var params = req.allParams();
    if (params.postId) {
      Post.create(params).exec(function (err) {
        if (err) return res.negotiate(err);
      });
    } else {
      PostMapping.create({
        author: req.session.me
      }).exec(function (err, newMap) {
        if (err) return res.negotiate(err);
        params.postId = newMap.id;
        Post.create(params).exec(function (err, newPost) {
          if (err) {
            if (err.invalidAttributes.content[0].rule === 'url') {
              return res.send(400, 'Your content url is invalid.');
            }
            return res.negotiate(err);
          }
          return res.redirect('/overview');
        });
      });
    }
  }
};

