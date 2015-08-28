var expect = require('chai').expect;

describe('UserModel:', function () {
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
      User.destroy({}).exec(function () {});
      done();
    });

    it('should have a name', function (done) {
      User.create({
        name: '',
        email: 'foobar@example.com',
        password: 'foobar'
      }).exec(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have an email', function (done) {
      User.create({
        name: 'Foo Bar',
        email: '',
        password: 'foobar'
      }).exec(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('should have a password', function (done) {
      User.create({
        name: 'Foo Bar',
        email: 'foobar@example.com',
        password: ''
      }).exec(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('its password must be at least 6 characters', function (done) {
      User.create({
        name: 'Foo Bar',
        email: 'foobar@example.com',
        password: 'foo'
      }).exec(function (err) {
        expect(err).to.exist;
        done();
      });
    });

    it('its password should be encrypted', function (done) {
      User.create(userSample).exec(function (err, user) {
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
        User.create(userWithInvalidEmail).exec(function (err) {
          expect(err).to.exist;
        });
      });
      done();
    });

    it('its email should be unique', function (done) {
      User.create(userSample).exec(function (err) {
        logError(err);
        User.create({
          name: 'Steve Jobs',
          email: 'foobar@example.com',
          password: 'stevejob'
        }).exec(function (err) {
          expect(err).to.exist;
          done();
        });
      });
    });
    it('its data can be format to JSON', function (done) {
      User.create(userSample).exec(function (err, user) {
        logError(err);
        var userJSON = user.toJSON();
        expect(userJSON).to.have.property('name');
        expect(userJSON).to.have.property('email');
        expect(userJSON).to.not.have.property('password');
        expect(userJSON).to.not.have.property('_csrf');
        done();
      });
    });
  });

  describe('when the user is edited', function () {
    beforeEach(function (done) {
      User.destroy({}).exec(function () {});
      done();
    });

    it('its name must not be blank', function (done) {
      User.create(userSample).exec(function (err, user) {
        logError(err);
        User.update(user, {name: ''}).exec(function (err) {
          expect(err).to.exist;
          done();
        });
      });
    });

    it('its email must not be blank', function (done) {
      User.create(userSample).exec(function (err, user) {
        logError(err);
        User.update(user, {email: ''}).exec(function (err) {
          expect(err).to.exist;
          done();
        });
      });
    });

    it('its password must not be blank', function (done) {
      User.create(userSample).exec(function (err, user) {
        logError(err);
        User.update(user, {password: ''}).exec(function (err) {
          expect(err).to.exist;
          done();
        });
      });
    });

    it('its password must be encrypted', function (done) {
      User.create(userSample).exec(function (err, user) {
        logError(err);
        User.update(user, {password: 'loremipsum'}).exec(function (err, updatedUser) {
          expect(updatedUser.password).not.to.equal('loremipsum');
          done();
        });
      });
    });

    it('its updated email should not be existed', function (done) {
      User.create(userSample).exec(function (err, userOne) {
        logError(err);
        User.create({
          name: 'Testing',
          email: 'testing@example.com',
          password: 'testing'
        }).exec(function (err, userTwo) {
          logError(err);
          User.update(userOne, {email: 'testing@example.com'}).exec(function (err, userUpdated) {
            expect(userUpdated).to.be.empty;
            done();
          });
        });
      });
    });

    it ('its new email must be valid', function (done) {
      var invalidEmails = ['user@example,com', 'user_at_foo.org', 'user.name@example.',
                           'foo@bar_baz.com', 'foo@bar+baz.com'];
      User.create(userSample).exec(function (err, user) {
        logError(err);
        invalidEmails.forEach(function (invalidEmail) {
          User.update(user, {email: invalidEmail}).exec(function (err) {
            expect(err).to.exist;
          });
        });
      });
      done();
    });
  });

  describe('given a valid password', function () {
    before(function (done) {
      User.destroy({}).exec(function () {
        done();
      });
    });
    it('should return true', function (done) {
      User.create({
        name: 'Tesing',
        email: 'test@example.com',
        password: 'testing'
      }).exec(function (err, user) {
        logError(err);
        user.validatePassword('testing', function (err, valid) {
          expect(valid).to.be.true;
          done();
        });
      });
    });
  });

  describe('given an invalid password', function () {
    before(function (done) {
      User.destroy({}).exec(function () {
        done();
      });
    });
    it('should return false', function (done) {
      User.create(userSample).exec(function (err, user) {
        logError(err);
        user.validatePassword('wrong_password', function (err, valid) {
          expect(valid).to.be.false;
          done();
        });
      });
    });
  });
});
