var request = require('supertest');
var should = require('should');

describe('UsersController', function () {
  var userSample = {
    name: 'Foo Bar',
    email: 'foobar@example.com',
    password: 'foobar',
    confirmation: 'foobar'
  };

  before(function (done) {
    Users.create(userSample).exec(function () {
      done();
    });
  });

  after(function (done) {
    Users.destroy({}).exec(function () {
      done();
    });
  });

  describe('GET /signin', function () {
    it('should return new session view', function (done) {
      request(sails.hooks.http.app)
        .get('/signin')
        .expect(200)
        .end(function (err, res) {
          res.text.should.containEql('Please sign in...');
          done();
        });
    });
  });

  describe('POST /signin', function () {

    it('should return 400 if missing email or password', function (done) {
      request(sails.hooks.http.app)
        .post('/signin')
        .send({
          email: '',
          password: ''
        })
        .expect(400)
        .end(function (err, res) {
          res.text.should.equal('Missing email or password!');
          done();
        });
    });

    it('should return 404 if email is not found', function (done) {
      request(sails.hooks.http.app)
        .post('/signin')
        .send({
          email: 'notfoundemail@example.com',
          password: 'foobar'
        })
        .expect(404)
        .end(function (err, res) {
          res.text.should.equal('Email is not found!');
          done();
        });
    });

    it('should return 400 if wrong password', function (done) {
      request(sails.hooks.http.app)
        .post('/signin')
        .send({
          email: 'foobar@example.com',
          password: 'foo'
        })
        .expect(400)
        .end(function (err, res) {
          res.text.should.equal('Wrong password!');
          done();
        });
    });

    it('should return 200 if valid', function (done) {
      request(sails.hooks.http.app)
        .post('/signin')
        .send({
          email: 'foobar@example.com',
          password: 'foobar'
        })
        .expect(200)
        .end(function (err, res) {
          res.text.should.equal('Login successfully!');
          done();
        });
    });
  });

  describe('GET /signout', function () {
    it('should redirect to homepage', function (done) {
      request(sails.hooks.http.app)
        .get('/signout')
        .end(function (err, res) {
          res.header.location.should.equal('/');
          done();
        });
    });
  });
});
