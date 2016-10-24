var tweet = document.querySelector('#tweet');
tweet.innerHTML= fetchTweets('https://twitter.com/Liverpool_ONE');

function fetchTweets(q) {
 
  var yql  = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22";
  var base = "https://twitter.com/i/search/timeline?f=realtime&src=typd&include_entities=0&q=";
 
  // Test the URL in YQL console to make sure it works
  var url  = yql + base + encodeURIComponent(q) + "%22&format=json";
 
   // Make synchronous AJAX request to yql
  var tweets = jQuery.ajax({type: "GET", url: url, dataType: 'json', async: false }).responseText;
 
  // Parse the JSON response
  var data = JSON.parse(tweets);
 
  // Return the HTML search results  
  return data.query.results.json.items_html;
  
}