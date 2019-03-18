// Homework 6 - GIPHY APIß



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
Uses array favorites() and stores "data.id" of Giphy API. The function prints favorites as
HTML using jQuery using unordered lists "<ul><li>" to the #sidebar.

Conditions:
    1. Only re-print list of favorites if NOT indexOf(). This is to limit the query of data from the site.
    2. Store relevant data of query in the button attributes to reduce the need for query calls.
        http://api.giphy.com/v1/gifs/" + {data.id} + "?api_key=" + {API Key}
       X
 */
function printFavorites(this_click) {

    var divTag = $("<div>");
    var liTag = $("<li>");
    var buttonTag = $("<button>");

    buttonTag.addClass("removebox");
    buttonTag.text("X");

    liTag.addClass("fav-list");
    liTag.attr("id", $(this_click).attr("id"));
    liTag.text($(this_click).attr("title"));

    divTag.append(buttonTag, liTag);
    //liTag.prepend(buttonTag);
    $("#favorite-list > ul").append(divTag);
}


/*
Make function to print GIFs
Try to reduce # of duplicates by searching through query.

*/

function getQuery(query_term, limit) {
    var api_key = "I13VgxVl0OMhKW6CC8InkKcR2S5eXFlB";
    var queryURL;

    if (limit == 1) {
        queryURL = "https://api.giphy.com/v1/gifs/" + query_term + "?api_key=" + api_key;
    } else {
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query_term + "&limit=" + limit + "&api_key=" + api_key;
    }

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var data;

        if (limit == 1) {
            data = [response.data];
        } else {
            data = response.data;
        }

        for (var i = 0; i < data.length; i++) {
            printGIF(data[i]);
        }
    });
}

function printGIF(data) {
    var divTag = $("<div>");
    var pTag = $("<p>");
    var imgTag = $("<img>");
    var buttonTag = $("<button>");

    divTag.addClass("gifblock");
    imgTag.addClass("gifinfo");
    pTag.addClass("ratings");
    buttonTag.addClass("favbutton");

    imgTag.attr("url_movie", data.images.original.url);
    imgTag.attr("url_still", data.images.original_still.url);
    imgTag.attr("rating", data.rating);

    buttonTag.text("+");
    buttonTag.attr("id", data.id);

    if (data.title == "") {
        buttonTag.attr("title", "No Title");
    } else {
        buttonTag.attr("title", data.title);
    }

    pTag.text("Rating: " + imgTag.attr("rating"));
    imgTag.attr("src", imgTag.attr("url_still"));

    divTag.append(pTag, imgTag, buttonTag);

    $("#gif-area").prepend(divTag);
}

$(document).on("click", ".button-print", function () {
    getQuery($(this).attr("id"), 10);
});

$(document).on("click", "#search-button", function () {
    event.preventDefault();

    var input = $("#search-input").val().trim();
    $("#search-input").val("");

    if (input != "" && topics.indexOf(input.toLowerCase()) == -1) {
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
    var gifID = $(this).attr("id");
    if (favorites.indexOf(gifID) == -1) {
        favorites.push(gifID);
        printFavorites(this);
    }
});

$(document).on("click", ".fav-list", function () {
    var gifID = $(this).attr("id");
    getQuery(gifID, 1);
});

$(document).on("click", ".removebox", function () {
    var gifID = $(this).parent().find("li").attr("id");
    
    $(this).parent().remove();

    favorites.splice(favorites.indexOf(gifID), 1);
    
});

printButtons();