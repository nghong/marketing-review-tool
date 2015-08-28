/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    content: {
      type: 'string',
      url: true,
      required: true
    },
    contentModified: {
      type: 'boolean'
    },
    metaTitle: {
      type: 'string'
    },
    metaDescription: {
      type: 'string'
    },
    facebookPost: {
      type: 'text'
    },
    version: {
      type: 'datetime',
      required: true,
      defaultsTo: new Date()
    },
    lastModified: {
      model: 'User'
    },
    postId: {
      model: 'PostMapping'
    }
  }
};

