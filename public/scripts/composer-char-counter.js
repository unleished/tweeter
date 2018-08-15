$(document).ready(function() {
  // --- our code goes here ---
  // const newTweet = document.querySelector(".new-tweet");

  $('.text-box').on('keyup', function() {
      var textCount = ($(this).val().length);
      var counterNum = 140 - textCount;

      if (counterNum < 0) {
        $(this).parent().find('.counter').text(counterNum).css('color', 'red');
      } else {
        $(this).parent().find('.counter').text(counterNum).css('color', 'black');
      }
  });


  console.log('document ready called');



});
