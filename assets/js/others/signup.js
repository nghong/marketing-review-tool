'use strict'

$('#sign-up-form').validator().on('submit', function (e) {
  if (!e.isDefaultPrevented()) {
    e.preventDefault()
    var formData = {
      'name': $('#inputName').val(),
      'email': $('#inputEmail').val(),
      'password': $('#inputPassword').val(),
      'confirmation': $('inputConfirmation').val()
    }

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: formData,
      dataType: 'json',
      encode: true
    }).done(function (data) {
      $('#errors').text(JSON.stringify(data))
      $('#errors').toggle()
    })
  }
})