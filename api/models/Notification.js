/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  type: {
    notification: function (typeStr) {
      return typeStr === 'review' || typeStr === 'update';
    }
  },

  attributes: {
    message: {
      type: 'string',
      required: true
    },
    typeOfNotification: {
      type: 'string',
      required: true,
      notification: true
    },
    belongsTo: {
      model: 'User'
    }
  }
};

