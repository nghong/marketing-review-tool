'use strict'
/*
$('#sign-up-form').validator().on('submit', function (e) {
  if (!e.isDefaultPrevented()) {
    var formData = {
      'name': $('input[name=name]').val(),
      'email': $('input[name=email]').val(),
      'password': $('input[name=superheroAlias]').val()
    }

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: formData,
      dataType: 'json',
      encode: true
    }).done(function (data) {
      console.log(data)
    })

    e.preventDefault()
  }
})
*/