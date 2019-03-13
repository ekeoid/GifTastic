// Homework 6 - API's

var topics = ["fear", "anger", "sadness", "joy", "disgust", "surprise", "trust", "anticipation"];

function printButtons() {

    for (var i=0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.attr("type", "button");
        newButton.attr("class", "button-print");
        newButton.attr("id", topics[i]);
        newButton.text(topics[i]);
        $("#button-area").append(newButton);
    }
    
}

function getQueryURL (q) {
    var api_key = "I13VgxVl0OMhKW6CC8InkKcR2S5eXFlB";
    var limit = 10;
    var query_term = q;

    return "https://api.giphy.com/v1/gifs/search?q=" + query_term + "&limit=" + limit + "&api_key=" + api_key;
}

var queryURL = getQueryURL("disgust");

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });


printButtons();
/*
var movie = ["Mr. Nobody", "Lion King", "Aladin", "Frozen"];

for (var i = 0; i < movie.length; i++) {

    var queryURL = "https://www.omdbapi.com/?t=" + movie[i] + "&y=&plot=short&apikey=trilogy";
    
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        var newRow = $("<tr>");
        // Create and save a reference to new empty table row
        
        //var titleID = $("<td>").text(response.Title);
        var newCol1 = $("<td>");
        newCol1.text(response.Title);

        var newCol2 = $("<td>");
        newCol2.text(response.Year);

        var newCol3 = $("<td>");
        newCol3.text(response.Actors);
        // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
        // Append the td elements to the new table row

        newCol1.appendTo(newRow);
        newCol2.appendTo(newRow);
        newCol3.appendTo(newRow);
        // Append the table row to the tbody element
        $("tbody").append(newRow);
      });
    }
    */