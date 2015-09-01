$('#sign-up-form').validator().on('submit', function (e) {
  if (!e.isDefaultPrevented()) {
    e.preventDefault();
    var formData = {
      'name': $('#inputName').val(),
      'email': $('#inputEmail').val(),
      'password': $('#inputPassword').val(),
      'confirmation': $('inputConfirmation').val()
    };

    $.ajax({
      type: 'POST',
      url: '/signup',
      data: formData,
      dataType: 'json',
      encode: true
    }).done(function (data) {
      window.location.href = "/overview";
    }).fail(function (error) {
      noty({
        type: 'error',
        text: error.responseText
      });
    });
  }
});