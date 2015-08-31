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
      window.location.href = '/overview';
    }).fail(function (error) {
      toastr.error(error.responseText);
    });
  }
});

function checkLength(element, maxLength) {
  var $element = $(element),
      $helpBlock = $(element + ' ~ .help-block');

  if ($element.val().length >= maxLength*0.9) {
    $helpBlock.text('You should keep the text below ' + maxLength + 
                    ' characters. Yours is: ' + $element.val().length);
  }
}

$(document).ready(function () {
  var $inputTitle           = $('#inputTitle'),
      $inputMetaTitle       = $('#inputMetaTitle'),
      $inputMetaDescription = $('#inputMetaDescription'),
      $inputFacebookStatus  = $('#inputFacebookStatus');
  $inputTitle.on('keydown keyup', function () {
    $inputMetaTitle.attr('placeholder', $inputTitle.val());
  });
  $inputMetaTitle.on('keydown keyup', function () {
    checkLength('#inputMetaTitle', 80);
  });
  $inputMetaDescription.on('keydown keyup', function () {
    checkLength('#inputMetaDescription', 156);
  });
  $inputFacebookStatus.on('keydown keyup', function () {
    checkLength('#inputFacebookStatus', 400);
  });
});