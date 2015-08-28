var request = require('supertest');
var should = require('chai').should();

describe('UserController', function () {
  var userSample = {
    name: 'Foo Bar',
    email: 'foobar@example.com',
    password: 'foobar',
    confirmation: 'foobar'
  };

  describe('GET /user', function () {
    it('should response with json and status 200', function (done) {
      request(sails.hooks.http.app)
        .get('/user')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /signup', function () {
    it('should response with signup page', function (done) {
      request(sails.hooks.http.app)
        .get('/signup')
        .expect(200, done);
    });
  });

  describe('POST /signup', function () {

    beforeEach('remove old records', function (done) {
      User.destroy({}).exec(function (err) {});
      done();
    });

    it('should response with user_id if valid data', function (done) {
      request(sails.hooks.http.app)
        .post('/signup')
        .send(userSample)
        .expect(('Content-Type', /json/))
        .end(function (err, res) {
          res.body.should.have.property('id');
          done();
        });
    });

    it('should response with 409 if email exists', function (done) {
      User.create(userSample).exec(function (err, user) {
        request(sails.hooks.http.app)
        .post('/signup')
        .send(userSample)
        .expect(409)
        .end(done);
      });
    });
  });

});
