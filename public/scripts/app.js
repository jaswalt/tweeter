/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const created = (date) => {
  let timeElapsed = Date.now() - date;
  if (timeElapsed < 1000000) {
    return Math.floor(timeElapsed / 10000) + " minutes ago";
  } else {
    return Math.floor(timeElapsed / 1000000000) + " days ago";
  }
}

function createTweetElement(tweet) {
  //var $tweet = $('<article>').addClass('each-tweet');

  let tweetHTML = `
    <article class="each-tweet">
            <header>
              ${ $('<img class="image">').attr('src', tweet.user.avatars.regular).prop('outerHTML') }
              ${ $('<span class="name">').text(tweet.user.name).prop('outerHTML') }
              <span class="handle">${tweet.user.handle}</span>
            </header>
              ${ $('<p>').text(tweet.content.text).prop('outerHTML') }
            <footer>
              ${ $('<div class="days">').text(created(tweet.created_at)).prop('outerHTML') }
              <div class="glyph-icons">
                <i class="fa fa-flag hidden" aria-hidden="true"></i>
                <i class="fa fa-retweet hidden" aria-hidden="true"></i>
                <i class="fa fa-heart hidden" aria-hidden="true"></i>
              </div>
            </footer>
    </article>`

  return tweetHTML;
}

function renderTweets(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  tweets.forEach(function(tweet) {
      // takes return value and appends it to the tweets container
    tweetElement = createTweetElement(tweet);
    $('.tweets').append(tweetElement);
  });
  return;
}

$(document).ready(function() {

  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      type: 'GET',
    })
    .done(function(data) {
      renderTweets(data);
    });
  }
  loadTweets();

  var form = $('.new-tweet form');
  form.on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: form.serialize()
    })
    .then(() => {
      $('.new-tweet textarea').val("");
      loadTweets();
    })
  })
});

