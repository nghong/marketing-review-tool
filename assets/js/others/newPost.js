$('#new-post-form').validator().on('submit', function (e) {
  if (!e.isDefaultPrevented()) {
    e.preventDefault();
    var formData = {
      'title': $('#inputTitle').val(),
      'content': $('#inputContent').val(),
      'metaTitle': $('#inputMetaTitle').val(),
      'metaDescription': $('#inputMetaDescription').val(),
      'facebookStatus': $('#inputFacebookStatus').val()
    };

    $.ajax({
      type: 'POST',
      url: '/post/new',
      data: formData,
      dataType: 'json',
      encode: true
    }).done(function (data) {
      toastr.info('Post has been created successful!');
    }).fail(function (error) {
      toastr.error(error.responseText);
    });
  }
});