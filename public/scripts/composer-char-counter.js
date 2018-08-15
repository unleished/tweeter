$(document).ready(function() {
  // --- our code goes here ---
  const newTweet = document.querySelector(".new-tweet");

  $(".new-tweet").find('textarea').on('input', function() {
      let textCount = ($(this).val().length);

      let counterNum = 140 - textCount;
      let counterText;

      if (counterNum < 0) {
        counterText = $(this).siblings('.counter').text(counterNum).css('color', 'red');
      } else {
        counterText = $(this).siblings('.counter').text(counterNum);
      }
  });

  console.log('document ready called');
});
