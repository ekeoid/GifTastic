<link href="readme.css" rel="stylesheet"></link>
# GifTastic

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
