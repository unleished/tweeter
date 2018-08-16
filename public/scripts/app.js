$(document).ready(function() {
// launch the tweet feed with these elements hidden.
  $('.new-tweet').hide();
  $('.new-tweet').find('#error').hide();
  $('.new-tweet').find('#errorShort').hide();

//shows tweet input
  $('#composeBtn').click(function() {
    $('.new-tweet').slideToggle('slow');
    $('textarea').focus();
    });

   function renderTweets(tweets) {
     for (const tweet of tweets) {
       $('#tweetContainer').append(createTweetElement(tweet));
     }
   }
//create and return an article html element generated dynamically
   function createTweetElement(tweetData) {
     var $tweet = $("<article>").addClass("tweet-display");
     var $tweetHeader = $("<header>").addClass('tweet-header');
     var $tweetImage = $('<img>').attr('src', tweetData.user.avatars.small);
     var $tweetName = $('<h2>').html(tweetData.user.name);
     var $tweetHandle = $('<p>').html(tweetData.user.handle);

     $tweetHeader.append($tweetImage);
     $tweetHeader.append($tweetName);
     $tweetHeader.append($tweetHandle);
     $tweet.append($tweetHeader);

     var $tweetSection = $('<section>')
     var $tweetBody = $('<p>').text(tweetData.content.text);

     $tweetSection.append($tweetBody);
     $tweet.append($tweetSection);

     var $tweetFooter = $('<footer>').addClass('tweet-footer');
     var $dayCount = (Date.now()-tweetData.created_at)/86400000;
     var $dayCountMore = Math.round($dayCount);
     var $dayCount1 = Math.ceil($dayCount);

     if ($dayCount < 1){
       $tweetFooter.append($('<p>').html('posted less than ' + $dayCount1 + ' day ago.'));
     } else {
       $tweetFooter.append($('<p>').html('posted ' + $dayCountMore + ' days ago.'));
     }

     var $divIcons = $('<div>').addClass('icons');
     var $flagIcon = $('<i>').addClass('fas fa-flag');
     var $retweetIcon = $('<i>').addClass('fas fa-retweet');
     var $heartIcon = $('<i>').addClass('fas fa-heart');

     $divIcons.append($flagIcon);
     $divIcons.append($retweetIcon);
     $divIcons.append($heartIcon);

     $tweetFooter.append($divIcons);

     $tweet.append($tweetFooter);

     return $tweet;
   }

//tweet submit ajax and validation
   $("form").on('submit', function (event) {
     event.preventDefault();
     $('.new-tweet').find('#error').hide();
     $('.new-tweet').find('#errorShort').hide();

      if (Number($('.tweet-submit').find('.counter').text()) === 140 ) {
        $('#errorShort').slideToggle('slow')
      } else if (Number($('.tweet-submit').find('.counter').text()) < 0) {
        $('#error').slideToggle('slow')
      } else {
           $.ajax({
             type: 'POST',
             url: '/tweets',
             data: $(this).serialize()
           })
           .done( function(data) {
              $('#tweetContainer').prepend(createTweetElement(data));
              $('.text-box').val('');
              $('.counter').text('140');
           })
           .fail(function(error) {
             console.log('error: ', error);
           })
      }
    });
//ajax call to display new tweet in feed
  function loadTweets(){
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(data){
        renderTweets(data);
      }
    });
  }
  loadTweets();
});
