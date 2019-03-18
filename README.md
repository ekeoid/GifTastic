# GifTastic (Homework #6)

<link href="readme.css" rel="stylesheet"></link>

### Overview

This is bootcamp homework assignment #6. This assignment is a rudimentary custom search engine for [GIPHY][]. This interface are panels, with top area for buttons to click which populate GIFs based on the text of the button. Below is the content area that updates with GIFs from either the button search or favorites. On the side is a search bar which will load more button tags or store favorites of the GIFs.

You can find the instructions for this assignment here: [homework.md][]

This README is edited after the coding. This task is a reflection of the assignment labor. The rest of this README will overview the functions of the assignment.

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
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) / [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) / [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [jQuery](https://api.jquery.com/)
- [GIPHY](https://developers.giphy.com/docs/)

### Features
Adding `favorites` section to the game resigned some of the functions. In the homework instructions, it called for "remaking" the list when adding new favorites to the page and for the todo items in Activity 07 `01-todolist-nopersistence`. This "emptying / remaking" seemed very *inefficient* and instead using the global array for `favorites`, the array and HTML only need to be updated or added to when there is a new item. This uses the `indexOf()` method to search in the array.

```js
    topics.indexOf(input.toLowerCase()) == -1

    favorites.indexOf(gifID) == -1
```

A feature I did not implement was updating the `topics` array to not "remake" the buttons. Theoretically, the new location for the new buttons is always `topics.length` and all previous buttons exists. There should be no need to re-establish all the `<button>` DOM information.

The styling for this assignment went back to using basic CSS. Media queries were added for mobile responsive, however the main adjustments were only padding, margin, and image size adjustments. To really respect the responsive assignment, I should focus on layout design in the HTML and figure out how to reposition `<div>` elements for each of the screen width sizes that are logical for end user interface.

A limitation in this code is the API query of the GIF images which performs the search and only returns the top 10. This means each time you call the button query, you have a high chance of getting back the same 10 GIF images. This can be randomized by looking through the `response` object data but was not implemented.

### JavaScript - `giphy.js`

```js
function printButtons() {...}
```
This function puts button topics on the `#button-area` is at the header location of the HTML.
- Empties the `<div>` element
- Loops through `topics.length`
   - Prints `<button>` with class `button-print` for each `topic[]`
- Appends `<button>` to the `#button-area` `<div>`


```js
function printFavorites(this_click) {...}
```
This function uses array `favorites[]` and stores `data.id` of GIPHY API at each index location. The `id` is stored as a unique identifier of the GIF image that is stored mainly to not add repeats of the same GIF when the user tries to favorite another GIF. This function also puts favorite GIF images by `data.title` to the `#favorite-list` in the HTML `<ul>` as an `<li>` element. In addition, a `<button>` tag is created with the text `X` for the user to remove the favorite in the future. The `.favlist` class is added to the `<li>` element tag and `.removebox` class is added to the `<button>` element tag. These classes for used for the event handler.
- Creates `<div>`, `<li>`, `<button>` tags
- Uses `this_click` parameter which is a reference to `.favbutton` click action when the user is selecting the GIF to add to the favorites area. The `this` refers the `<button>` created from `printGIF(data)` which assigned attributes `id` and `title` to the tag. These are referenced in the function.
- Appends the `<div>` favorite item displaying title to the `#favorite-list` `<ul>`


```js
function getQuery(query_term, limit) {...}
```
This function is where the **AJAX** and **API** happen in the code. Originally it did not contain any arguments, however, it made sense to condense some of the code to wrap getting data and printing the GIF image to the web page. From the GIPHY documentation, there are 2 API URLs which are used to query data for GIFs: by ID and by Search Term. In this function, it will reference either API URL depending on `limit` parameter. The ID endpoint returns only 1 `data` object while the SEARCH endpoint returns an array `data[]` object based on the query limit.

#### Get GIF by ID Endpoint

`http://api.giphy.com/v1/gifs/{GIF_ID}?api_key={YOUR_API_KEY}`

|Get Parameters|Value|
|---|---|
| Host | `api.gipshy.com` |
| Path | `/v1/gifs/{gif_id}` |

|Request Parameters|Value|
|---|---|
|`api_key`|GIPHY API Key |
|`id`'s| Filters results by specified GIF IDs, separated by commas.|

#### Search Endpoint

`http://api.giphy.com/v1/gifs/search?q={SEARCH_TERM}&limit={LIMIT_NUM}&api_key={YOUR_API_KEY}`

|Get Parameters|Value|
|---|---|
| Host | `api.gipshy.com` |
| Path | `/v1/gifs/search` |

|Request Parameters|Value|
|---|---|
|`api_key`|GIPHY API Key |
|`q`| Search query term or phrase. GIPHY search will automatically look for exact matches to queries + AND match + OR match. Explicit AND + OR boolean clauses in search queries are not supported.|
|`limit`|The maximum number of records to return. (default: "25")

This function:
- Checks `limit`.
    - If `1` uses ID endpoint and the AJAX response will also be stored in variable `data` but as a single element array
    - If `> 1` uses SEARCH endpoint and the AJAX response will store the return data in variable `data`
    - NOTE: The variable data is the response data, but falls in the sub-data for `response.data`
- If Promise, loops through `data.length`. Based on this program, it could either be `1` (id) or `10` (search).
    - Calls function `printGIF(data)` to put HTML of the data on the page.


```js
function printGIF(data) {...}
```
This function prints receives the argument `response.data` from the function `getQuery(query_term, limit)`. Once the AJAX Promise is met, the `data` is a single object. The data extracted is stored in attributes embedded in the HTML.
- `(response.data)`.`id`
- `(response.data)`.`title`
- `(response.data)`.`rating`
- `(response.data)`.`images.original`
- `(response.data)`.`images.original_still`

This function:
- Creates `<div>`, `<p>`, `<img>`,`<button>` tags
- Add events classes `.gifinfo` and `.favbutton` as needed
- Assigns values to attributes `url_movie`, `url_still`, `rating`, `title`, and `id` for information retrieval in the code.
- Wraps all the `<p`, `<img>`, and `<button>` tags into a `<div>`
- Prepends each GIF in the `<div>` to the HTML `#gif-area`.


```js
$(document).on("click", ".button-print", function () {...});
```
Click event handler for class `.button-print` which are the list of `topics[]`. Clicking the button calls the function `getQuery()`. These buttons set the `limit` parameter to `10` and the `query_term` parameter to the `<button>` attribute `id` which is the `String` word of the `topics[]`.

```js
$(document).on("click", "#search-button", function () {...});
```
Click event handler for id `#search-button` which captures and processes the input of the search bar `#search-input`. If the input is blank (`""`) or `.indexOf` the `topics[]`, the topic won't be added. As long as there is input, it will update the `topics[]` and reprint the buttons with function `printButtons()`.

A feature that could be added to this is a list of the available topics to choose from (emotions) which will restrict the user input to only the topic.

```js
$(document).on("click", ".gifinfo", function () {...});
```
Click event handler for class `.gifinfo` which animates or stops the GIF image/video. Since this is an `<img>` tag and uses the source link attribute `src`, an `if` statement will compare that to the with the *paused* attribute `url_still`. If `true`, then the `src` is replaced with the `url_movie` to allow animation. Both the `url_still` and `url_movie` attribute values should remain untouched after they are initially assigned.

```js
$(document).on("click", ".favbutton", function () {...});
```
Click event handler for class `.favbutton` which is a `+` sign button added to the bottom left corner of every GIF image. The `<button>` tag for this already has the associated attribute `id` for the GIF image. It is captured and compared with `.indexOf()` in `favorites[]` to make sure there are no repeats. If the favorite is new, it is added to to the array `favorites[]` and `#favorite-list` HTML.

```js
$(document).on("click", ".fav-list", function () {...});
```
Click event handler for class `.fav-list` which holds a list of all the `(response.data).title` of the GIF images. Clicking the titles will call the function `getQuery()` with the attribute `id` for the `this` GIF image and a `limit` of `1` to ensure the ID endpoint is used for the AJAX query.

```js
$(document).on("click", ".removebox", function () {...});
```
Click event handler for class `.removebox` which will remove the entire `<div>` that contains the favorited GIF image and also remove the `id` from the `favorites[]` array. The `<button>` that is clicked has the element as a child of the overall `<div>`. For jQuery `.parent()` and `.find()` methods were used to extract the `id` attribute from another same level `<li>` element and to `.remove()` the clicked DOM object.


