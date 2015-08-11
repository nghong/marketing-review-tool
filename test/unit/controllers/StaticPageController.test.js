// var StaticPageController = require('../../../api/controllers/StaticPageController')
// var sinon = require('sinon')
var assert = require('assert')
var request = require('supertest')

describe('StaticPage Controller', function () {

  describe('#index', function () {

    it('should have the text Marketing Review Tool', function (done) {
      request(sails.hooks.http.app)
        .get('/')
        .expect(function (res) {
          assert('<h1>Marketing Review Tool</h1>' in res.body)
        })
        .end(done)
    })
  })
})
