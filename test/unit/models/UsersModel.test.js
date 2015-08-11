var assert = require('assert')

describe.only('Users Model', function () {
  var userSample = {
    name: 'Foo Bar',
    email: 'foobar@example.com',
    password: 'foobar'
  }
  function logError (err) {
    if (err) {
      console.log(err)
    }
  }

  describe('when the user is created', function () {
    beforeEach('Remove all records', function (done) {
      Users.destroy({}).exec(function (err) {})
      done()
    })

    it('should have a name', function (done) {
      Users.create({
        name: '',
        email: 'foobar@example.com',
        password: 'foobar'
      }).exec(function (err) {
        assert.ok(err)
        done()
      })
    })

    it('should have an email', function (done) {
      Users.create({
        name: 'Foo Bar',
        email: '',
        password: 'foobar'
      }).exec(function (err) {
        assert.ok(err)
        done()
      })
    })

    it('should have a password', function (done) {
      Users.create({
        name: 'Foo Bar',
        email: 'foobar@example.com',
        password: ''
      }).exec(function (err) {
        assert.ok(err)
        done()
      })
    })

    it('its password should be encrypted', function (done) {
      Users.create(userSample).exec(function (err, user) {
        logError(err)
        assert.notStrictEqual(userSample.password, user.password)
        done()
      })
    })

    it('its email should be valid', function (done) {
      var invalidEmails = ['user@example,com', 'user_at_foo.org', 'user.name@example.',
                           'foo@bar_baz.com', 'foo@bar+baz.com']
      var userWithInvalidEmail = {
        name: 'Foo Bar',
        email: '',
        password: 'foobar'
      }
      invalidEmails.forEach(function (invalidEmail) {
        userWithInvalidEmail.email = invalidEmail
        Users.create(userWithInvalidEmail).exec(function (err) {
          assert.ok(err)
        })
      })
      done()
    })

    it('its email should be unique', function (done) {
      Users.create(userSample).exec(function (firstErr, userOne) {
        logError(firstErr)
        Users.create({
          name: 'Steve Jobs',
          email: 'foobar@example.com',
          password: 'stevejob'
        }).exec(function (secondErr) {
          assert.ok(secondErr)
          done()
        })
      })
    })
  })

  describe('when the user is edited', function () {
    beforeEach(function (done) {
      Users.destroy({}).exec(function () {})
      done()
    })

    it('its updated email should not be existed', function (done) {
      Users.create(userSample).exec(function (err, userOne) {
        logError(err)
        Users.create({
          name: 'Steve Stop',
          email: 'stevestop@example.com',
          password: 'stevestop'
        }).exec(function (err, userTwo) {
          logError(err)
          Users.update(userOne, {email: 'stevestop@example.com'}).exec(function (err) {
            assert.ok(err)
            done()
          })
        })
      })
    })
  })
})
