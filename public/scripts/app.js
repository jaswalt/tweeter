/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

const created = (date) => {
  let timeElapsed = Date.now() - date;
  if (timeElapsed < 1000000) {
    return Math.floor(timeElapsed / 10000) + " minutes ago";
  } else {
    return Math.floor(timeElapsed / 1000000000) + " days ago";
  }
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

function createTweetElement(tweet) {
  //var $tweet = $('<article>').addClass('each-tweet');

  let tweetHTML = `
    <article class="each-tweet">
            <header>
              <img class="image" src=${tweet.user.avatars.regular}>
              <span class="name">${tweet.user.name}</span>
              <span class="handle">${tweet.user.handle}</span>
            </header>
              <p>${tweet.content.text}</p>
            <footer>
              <div class="days">
                ${created(tweet.created_at)}
              </div>
              <div class="glyph-icons">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
              </div>
            </footer>
    </article>`

  return tweetHTML;
}


$(document).ready(function() {
  renderTweets(data);


});

