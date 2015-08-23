'use strict'
var request = require('supertest')
var should = require('should')

describe('UsersController', function () {
  var userSample = {
    name: 'Foo Bar',
    email: 'foobar@example.com',
    password: 'foobar',
    confirmation: 'foobar'
  }

  describe('GET /signin', function () {
    it('should return new session view', function (done) {
      request(sails.hooks.http.app)
        .get('/signin')
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('Please sign in...')
          done()
        })
    })
  })

  describe('POST /signin', function () {
    beforeEach('remove old records and add a new user', function (done) {
      Users.destroy({}).exec(function () {
        Users.create(userSample).exec(function () {
          done()
        })
      })
    })

    it('should return 400 if missing email or password', function (done) {
      request(sails.hooks.http.app)
        .post('/signin')
        .send({
          email: '',
          password: ''
        })
        .expect(400)
        .end(function (err, res) {
          res.text.should.equal('Missing email or password!')
          done()
        })
    })

    it('should return 404 if email is not found', function (done) {
      request(sails.hooks.http.app)
        .post('/signin')
        .send({
          email: 'foo@example.com',
          password: 'foobar'
        })
        .expect(404)
        .end(done)
    })

    it('should return 400 if wrong password', function (done) {
      request(sails.hooks.http.app)
        .post('/signin')
        .send({
          email: 'foobar@example.com',
          password: 'foo'
        })
        .expect(400)
        .end(function (err, res) {
          res.text.should.equal('Wrong password!')
          done()
        })
    })

    it('should return 200 and user_id if valid', function (done) {
      request(sails.hooks.http.app)
        .post('/signin')
        .send({
          email: 'foobar@example.com',
          password: 'foobar'
        })
        .expect(200)
        .end(function (err, res) {
          res.text.should.equal('Login successfully!')
          done()
        })
    })
  })
})
