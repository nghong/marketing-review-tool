var StaticPageController = require('../../../api/controllers/StaticPageController')
var sinon = require('sinon')
var assert = require('assert')

describe('StaticPage Controller', function () {
  describe('when we invoke the index action', function () {
    it('should return hello message', function () {
      var send = sinon.spy()
      StaticPageController.index(null, {
        'send': send
      })
      assert(send.called)
      assert(send.calledWith('Hello World'))
    })
  })
})