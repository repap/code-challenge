# code-challenge

## Environment
node js, express

## Requirements
get books with a search query
returns 5 entries by default
result is sorted by title alphabetical

## Response Object
An entry contains:
- title: String
- authors: Array
- information: String

## Additional Information
Book Api
https://developers.google.com/books/docs/v1/reference/volumes/list


## Tasks
- Setup a node project with express
- Create a get endpoint with an search query and config to limit results (default 5)
- Create an internal API request to Book API
- Send the Book API response to my endpoint
- Sort and Limit the Book API response
- Cancele the Book API request after 1 minute latest

### Research
- Check for health check and metrics
- ...
