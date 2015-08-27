var expect = require('chai').expect;

describe('UsersModel', function () {
  var userSample = {
    name: 'Foo Bar',
    email: 'foobar@example.com',
    password: 'foobar'
  };
  function logError (err) {
    if (err) {
      console.log(err);
    }
  }

  describe('when the user is created', function () {
    beforeEach('remove old records', function (done) {
      Users.destroy({}).exec(function () {});
      done();
    });

    it('should have a name', function (done) {
      Users.create({
        name: '',
        email: 'foobar@example.com',
        password: 'foobar'
      }).exec(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have an email', function (done) {
      Users.create({
        name: 'Foo Bar',
        email: '',
        password: 'foobar'
      }).exec(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have a password', function (done) {
      Users.create({
        name: 'Foo Bar',
        email: 'foobar@example.com',
        password: ''
      }).exec(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('its password must be at least 6 characters', function (done) {
      Users.create({
        name: 'Foo Bar',
        email: 'foobar@example.com',
        password: 'foo'
      }).exec(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('its password should be encrypted', function (done) {
      Users.create(userSample).exec(function (err, user) {
        logError(err);
        expect(user.password).to.not.equal(userSample.password);
        done();
      });
    });

    it('its email should be valid', function (done) {
      var invalidEmails = ['user@example,com', 'user_at_foo.org', 'user.name@example.',
                           'foo@bar_baz.com', 'foo@bar+baz.com'];
      var userWithInvalidEmail = {
        name: 'Foo Bar',
        email: '',
        password: 'foobar'
      };
      invalidEmails.forEach(function (invalidEmail) {
        userWithInvalidEmail.email = invalidEmail;
        Users.create(userWithInvalidEmail).exec(function (err) {
          expect(err).to.exist;
        });
      });
      done();
    });

    it('its email should be unique', function (done) {
      Users.create(userSample).exec(function (err) {
        logError(err);
        Users.create({
          name: 'Steve Jobs',
          email: 'foobar@example.com',
          password: 'stevejob'
        }).exec(function (err) {
          expect(err).to.exist;
          done();
        });
      });
    });
  });

  describe('when the user is edited', function () {
    beforeEach(function (done) {
      Users.destroy({}).exec(function () {});
      done();
    });

    it('its name must not be blank', function (done) {
      Users.create(userSample).exec(function (err, user) {
        logError(err);
        Users.update(user, {name: ''}).exec(function (err) {
          expect(err).to.exist;
          done();
        });
      });
    });

    it('its email must not be blank', function (done) {
      Users.create(userSample).exec(function (err, user) {
        logError(err);
        Users.update(user, {email: ''}).exec(function (err) {
          expect(err).to.exist;
          done();
        });
      });
    });

    it('its password must not be blank', function (done) {
      Users.create(userSample).exec(function (err, user) {
        logError(err);
        Users.update(user, {password: ''}).exec(function (err) {
          expect(err).to.exist;
          done();
        });
      });
    });

    it('its password must be encrypted', function (done) {
      Users.create(userSample).exec(function (err, user) {
        logError(err);
        Users.update(user, {password: 'loremipsum'}).exec(function (err, updatedUser) {
          expect(updatedUser.password).not.to.equal('loremipsum');
          done();
        });
      });
    });

    it('its updated email should not be existed', function (done) {
      Users.create(userSample).exec(function (err, userOne) {
        logError(err);
        Users.create({
          name: 'Steve Stop',
          email: 'stevestop@example.com',
          password: 'stevestop'
        }).exec(function (err, userTwo) {
          logError(err);
          Users.update(userOne, {email: 'stevestop@example.com'}).exec(function (err) {
            expect(err).to.exist;
            done();
          });
        });
      });
    });

    it ('its new email must be valid', function (done) {
      var invalidEmails = ['user@example,com', 'user_at_foo.org', 'user.name@example.',
                           'foo@bar_baz.com', 'foo@bar+baz.com'];
      Users.create(userSample).exec(function (err, user) {
        logError(err);
        invalidEmails.forEach(function (invalidEmail) {
          Users.update(user, {email: invalidEmail}).exec(function (err) {
            expect(err).to.exist;
          });
        });
      });
      done();
    });
  });

  describe('given a valid password', function () {
    before(function (done) {
      Users.destroy({}).exec(function () {
        done();
      });
    });
    it('should return true', function (done) {
      Users.create({
        name: 'Tesing',
        email: 'test@example.com',
        password: 'testing'
      }).exec(function (err, user) {
        logError(err);
        user.validatePassword('testing', function (err, valid) {
          valid.should.be.true();
          done();
        });
      });
    });
  });

  describe('given an invalid password', function () {
    before(function (done) {
      Users.destroy({}).exec(function () {
        done();
      });
    });
    it('should return false', function (done) {
      Users.create(userSample).exec(function (err, user) {
        logError(err);
        user.validatePassword('wrong_password', function (err, valid) {
          valid.should.be.false();
          done();
        });
      });
    });
  });
});
