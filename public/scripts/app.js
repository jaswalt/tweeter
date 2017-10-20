const created = (date) => {
  let timeElapsed = Date.now() - date;
  if (timeElapsed > 31622400000) {
    return Math.floor(timeElapsed / 1000 / 60 / 60 / 24 / 365) + " years ago";
  } else if (timeElapsed > 86400000) {
    return Math.floor(timeElapsed / 1000 / 60 / 60 / 24) + " days ago";
  } else if (timeElapsed > 3600000) {
    return Math.floor(timeElapsed / 1000 / 60 / 60) + " hours ago";
  } else if (timeElapsed > 60000) {
    return Math.floor(timeElapsed / 1000 / 60) + " minutes ago";
  } else {
    return Math.floor(timeElapsed / 1000) + " seconds ago";
  }
}

function createTweetElement(tweet) {
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
  tweets.forEach(function(tweet) {
    tweetElement = createTweetElement(tweet);
    $('.tweets').prepend(tweetElement);
  });
  return;
}

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    type: 'GET',
  })
  .done(function(data) {
    renderTweets(data);
  });
}

// DOC.READY
$(document).ready(function() {

  // Hide new-tweet
  $('.new-tweet').hide();
  // Compose button shows and hides new-tweet
  $('#compose').click(function() {
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  });

  const form = $('.new-tweet form');
  form.on('submit', function(event) {
    event.preventDefault();

    if (!$('.new-tweet textarea').val()) {
      $('.new-tweet .error').text("Error: No text inputed.");
    } else if ($('.new-tweet .negCharset').length > 0) {
      $('.new-tweet .error').text("Error: Too many characters.");
    } else {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: form.serialize()
      })
      .then(() => {
        $('.new-tweet textarea').val("");
        $('.new-tweet .counter').text("140");

        loadTweets()
      });
    }
  });

  loadTweets();

});