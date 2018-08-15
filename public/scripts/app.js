/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // const data = [
 //   {
 //     "user": {
 //       "name": "Newton",
 //       "avatars": {
 //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
 //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
 //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
 //       },
 //       "handle": "@SirIsaac"
 //     },
 //     "content": {
 //       "text": "If I have seen further it is by standing on the shoulders of giants"
 //     },
 //     "created_at": 1461116232227
 //   },
 //   {
 //     "user": {
 //       "name": "Descartes",
 //       "avatars": {
 //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
 //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
 //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
 //       },
 //       "handle": "@rd" },
 //     "content": {
 //       "text": "Je pense , donc je suis"
 //     },
 //     "created_at": 1461113959088
 //   },
 //   {
 //     "user": {
 //       "name": "Johann von Goethe",
 //       "avatars": {
 //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
 //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
 //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
 //       },
 //       "handle": "@johann49"
 //     },
 //     "content": {
 //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
 //     },
 //     "created_at": 1461113796368
 //   }
 // ];

$(document).ready(function() {

  $('.new-tweet').hide();
  $('.new-tweet').find('#error').hide();

  $('#composeBtn').click(function() {
    $('.new-tweet').slideToggle('slow');
    $('textarea').focus();
    });

   function renderTweets(tweets) {
     for (const tweet of tweets) {
       $('#tweetContainer').append(createTweetElement(tweet));
       console.log('rendertweet text: ', tweet.content.text);
     }
   }

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


   $("form").on('submit', function (event) {
     event.preventDefault();
     $('.new-tweet').find('#error').hide();

      if ($('.text-box').parent().find('.counter').text() >= 0) {
         $.ajax({
           type: 'POST',
           url: '/tweets',
           data: $(this).serialize()
         })
         .done( function(data) {
           console.log('success', data);
            $('#tweetContainer').prepend(createTweetElement(data));
            $('.text-box').val('');

         })
         .fail(function(error) {
           console.log('error: ', error);
         })
      } else {
        $('#error').slideToggle('slow')
      }
    })

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
