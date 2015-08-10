// var StaticPageController = require('../../../api/controllers/StaticPageController')
// var sinon = require('sinon')
var assert = require('assert')
var request = require('supertest')

describe('StaticPageController', function () {
  describe('#index', function (done) {
    it('should have the text Marketing Review Tool', function () {
      request(sails.hooks.http.app)
        .get('/')
        .expect(function (res) {
          assert('<h1>Marketing Review Tool</h1>' in res.body)
        })
        .end(done)
    })
  })
})
