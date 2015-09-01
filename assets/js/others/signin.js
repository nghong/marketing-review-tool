$('#sign-in-form').validator().on('submit', function (e) {
  if (!e.isDefaultPrevented()) {
    e.preventDefault();
    var formData = {
      'email': $('#inputEmail').val(),
      'password': $('#inputPassword').val()
    };

    $.ajax({
      type: 'POST',
      url: '/signin',
      data: formData,
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
