/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
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
}

const created = (date) => {
  let timeElapsed = Date.now() - date;
  if (timeElapsed < 1000000) {
    return Math.floor(timeElapsed / 10000) + " minutes ago";
  } else {
    return Math.floor(timeElapsed / 1000000000) + " days ago";
  }
}

const createTweetElement = (object) => {
  //let $Tweet = $("<article>").addClass("each-tweet");
return `
  <div class="each-tweet">
          <header>
            <img class="image" src=${tweetData.user.avatars.regular}>
            <span class="name">${tweetData.user.name}</span>
            <span class="handle">${tweetData.user.handle}</span>
          </header>
            <p>${tweetData.content.text}</p>
          <footer>
            <div class="days">
              ${created(tweetData.created_at)}
            </div>
            <div class="glyph-icons">
              <i class="fa fa-flag" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
            </div>
          </footer>
  </div>`
}


$(document).ready(function() {

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
//console.log($tweet); // to see what it looks like
$('.tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});



