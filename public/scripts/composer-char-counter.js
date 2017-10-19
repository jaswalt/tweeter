$(document).ready(function() {

  $('textarea').on('keyup', function(event) {
    var charset = (140 - event.target.value.length);
    var counter = $(event.target).parent().children('.counter');

    counter.text(charset);

    if (charset < 0) {
      counter.addClass('negCharset');
    } else {
      counter.removeClass('negCharset');
      $('.new-tweet .error').text("");
    }
  });
});