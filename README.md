# GifTastic (Homework #6)

<link href="readme.css" rel="stylesheet"></link>

### Overview

This is bootcamp homework assignment #6. This assignment is a rudimentary custom search engine for [GIPHY][]. This interface are panels, with top area for buttons to click which populate GIFs based on the text of the button. Below is the content area that updates with GIFs from either the button search or favorites. On the side is a search bar which will load more button tags or store favorites of the GIFs.

You can find the instructions for this assignment here: [homework.md][]

The rest of this README will overview the functions of the assignment.

[GIPHY]: https://giphy.com/
[homework.md]: https://github.com/ekeoid/GifTastic/blob/master/assets/homework.md

### File Structure

```
├── assets
|  ├── css
|  |  └── style.css
|  └── javascript
|     └── giphy.js
└── index.html
```

### References
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [jQuery](https://api.jquery.com/)
- [GIPHY](https://developers.giphy.com/docs/)

#### JavaScript - `giphy.js`

```js
function printButtons() {...}
```

```js
function printFavorites(this_click) {...}
```

```js
function getQuery(query_term, limit) {...}
```

```js
function printGIF(data) {...}
```

```js
$(document).on("click", ".button-print", function () {...});
```

```js
$(document).on("click", "#search-button", function () {...});
```

```js
$(document).on("click", ".gifinfo", function () {...});
```

```js
$(document).on("click", ".favbutton", function () {...});
```

```js
$(document).on("click", ".fav-list", function () {...});
```

```js
$(document).on("click", ".removebox", function () {...});
```

### Search Endpoint

|Get Parameters|Value|
|---|---|
| Host | `api.gipshy.com` |
| Path | `/v1/gifs/search` |

|Request Parameters|Value|
|---|---|
|`api_key`|GIPHY API Key |
|`q'| Search query term or phrase. GIPHY search will automatically look for exact matches to queries + AND match + OR match. Explicit AND + OR boolean clauses in search queries are not supported.|
|`limit`|The maximum number of records to return. (default: "25")

`http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=YOUR_API_KEY`

`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats`
`http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC`


```js
// Coding Notes

$("#ID").on("click", function() {
  event.preventDefault();
})

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  // CODE GOES HERE
});

response.data.id
response.data.title
response.data.url

response.data.images.fixed_width_small
    .url
    .width : 100
    .height : 100

response.data.images.fixed_width_small_still
    .url
    .width: 100
    .height: 100

response.data.images.fixed_width_still
    .url
    .width: 200
    .height: 200

response.data.images.fixed_width
    .url
    .width: 200
    .height: 200

response.data.images.480w_still
    .url
    .width: 480
    .height: 480

response.data.images.original
    .url
    .width: 720
    .height: 720

response.data.images.original_still
    .url
    .width: 720
    .height: 720


```




### Get GIF by ID Endpoint

|Get Parameters|Value|
|---|---|
| Host | `api.gipshy.com` |
| Path | `/v1/gifs/{gif_id}` |

|Request Parameters|Value|
|---|---|
|`api_key`|GIPHY API Key |
|`id`'s| Filters results by specified GIF IDs, separated by commas.|


`http://api.giphy.com/v1/gifs/ID?api_key=YOUR_API_KEY`

### Media Queries

- `480 px` (xs)
- `768 px` (s)
- `992 px` (m)
- `1200 px` (l)
