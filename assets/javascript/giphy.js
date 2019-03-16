// Homework 6 - GIPHY APIß

var api_key = "I13VgxVl0OMhKW6CC8InkKcR2S5eXFlB"; // try to hide inside query function. 
var limit = 10; // limit should try to be unique??

var topics = ["fear", "anger", "sadness", "joy", "disgust", "surprise", "trust", "anticipation"];
var favorites = [];

function printButtons() {
    $("#button-area").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.attr("type", "button");
        newButton.attr("class", "button-print btn btn-2 btn-2h");
        newButton.attr("id", topics[i]);
        newButton.text(topics[i]);
        $("#button-area").append(newButton);
    }

}

/*
printFavorites()
Uses array favorites() and stores "data.id" of Giphy API. The function prints favorites as HTML using jQuery using unordered lists "<ul><li>" to the #sidebar.
Conditions:
    1. Only re-print list of favorites if NOT indexOf(). This is to limit the query of data from the site.
    2. Store relevant data of query in the button attributes to reduce the need for query calls.
        http://api.giphy.com/v1/gifs/" + {data.id} + "?api_key=" + {API Key}
       X
 */
function printFavorites() {
    
    $("#favorite-list").empty();

    var newUL = $("<ul>");


    for (var i = 0; i < favorites.length; i++) {

        var queryURL = "http://api.giphy.com/v1/gifs/" + favorites[i] + "?api_key=" + api_key;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var newLI = $("<li>");

            newLI.text(response.data.title);
            console.log(response.data.images.fixed_width_small_still);
            console.log(response.data.url);
            newUL.append(newLI);
        });
    }

    $("#favorite-list").append(newUL);
}


/*
Make function to print GIFs
Try to reduce # of duplicates by searching through query.

*/

function getQuery(q) {
    var query_term = q;

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query_term + "&limit=" + limit + "&api_key=" + api_key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);

        for (var i = 0; i < 10; i++) {
            var divTag = $("<div>");
            var pTag = $("<p>");
            var imgTag = $("<img>");
            var buttonTag = $("<button>");

            divTag.addClass("gifblock");
            imgTag.addClass("gifinfo");
            pTag.addClass("ratings");
            buttonTag.addClass("favbutton");

            imgTag.attr("url_movie", response.data[i].images.original.url);
            imgTag.attr("url_still", response.data[i].images.original_still.url);
            imgTag.attr("rating", response.data[i].rating);

            buttonTag.text("+");
            buttonTag.attr("id", response.data[i].id);
            buttonTag.attr("title", response.data[i].title);

            pTag.text("Rating: " + imgTag.attr("rating"));
            imgTag.attr("src", imgTag.attr("url_still"));


            divTag.append(pTag, imgTag, buttonTag);

            $("#gif-area").prepend(divTag);
        }

    });

}

$(document).on("click", ".button-print", function () {
    event.preventDefault();

    getQuery($(this).attr("id"));
});

$(document).on("click", "#search-button", function () {
    event.preventDefault();

    var input = $("#search-input").val();
    $("#search-input").val("");
    if (input != "") {
        // only print if !indexOf()
        topics.push(input);
        printButtons();
    }
});

$(document).on("click", ".gifinfo", function () {
    if ($(this).attr("src") == $(this).attr("url_still")) {
        $(this).attr("src", $(this).attr("url_movie"));
    } else {
        $(this).attr("src", $(this).attr("url_still"));
    }
});

$(document).on("click", ".favbutton", function () {
    favorites.push($(this).attr("id"));
    printFavorites();
});

printButtons();