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

