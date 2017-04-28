$(document).ready(function() {
  //MAKE LIST OF COLORS
  var colors = ["#7F7EFF", "#7B7263", "#FC5130", "#3C1742", "#DD7596", "#37718E", "#F9AB55", "#662E9B", "#EA3546", "#5F5980", "#3B5249", "#A28F9D", "#04A777"];
  //RUN THE GENERATE QUOTE FUNCTION ON PAGE LOAD
  genQuote();
  //RUNS GENERATE QUOTE FUNCTION EVERY TIME BUTTON IS PRESSED
  $("button#newQuote").click(function() {
    genQuote();
  });
  //GENERATE QUOTE FUNCTION
  function genQuote() {
    $.getJSON("https://got-quotes.herokuapp.com/quotes", function(data) { //MAKES GET REQUEST AND STORES DATA IN VARIABLE
      //STORES DATA IN VARIABLES
      var character = data.character;
      var quote = data.quote;
      //GENERATES RANDOM NUMBER TO USE WITH COLORS ARRAY
      var color = genColor();
      //UPDATES TWEET HREF WITH QUOTE EVERY TIME NEW QUOTE IS LOADED
      $('#tweetbutton').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes,gameofthrones&text=' + encodeURIComponent('"' + quote + '" ' + character));
      //FADES TEXT IN AND OUT AS NEW QUOTE IS LOADED AND NEW COLOR LOADED
      $("h2#quote").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $("h2#quote").html("<i class='quote left icon'></i>" + quote + "<i class='quote right icon'></i>");
        });
      $("h6#character").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $("h6#character").text("- " + character);
        });
      //CHANGES COLOR OF PAGE TO RANDOM COLOR SELECTED FROM COLORS ARRAY
      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);
      $("button").animate({
        backgroundColor: colors[color]
      }, 500);
    });
  }
  //GENERATES RANDOM NUMBER TO USE WITH COLORS ARRAY
  function genColor() {
    return Math.floor(Math.random() * colors.length);
  }
});
