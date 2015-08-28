/**
* PostMapping.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    posts: {
      collection: 'Post',
      via: 'postId'
    },
    owner: {
      model: 'User'
    },
    reviewers: {
      collection: 'User',
      via: 'reviews'
    }
  }
};

