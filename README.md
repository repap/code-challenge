# Project Setup & Startup
The service is an application based on Node.js including the express framework. 
To run the application Node.js (v10.12.0) and npm (v6.4.1) are required.

Before you can start the application localy it is mandatory to setup an .env file.
Please use the following example as an guide line to create a working .env file.

Example .env file
```
# defines the timeout for the external api requests
TIMEOUT=60000

# defines the amount of maximum books & albums
LIMIT=5

# defines the port for the server
PORT=4000
```

It is possible to run the application in an production or development mode.
The difference between both are, that the development mode uses nodemon to restart the application on any code changes.

```
#dev
npm run dev

#prod
npm start
```

If the application was started with an .env file as shown above the service endpoint can be used with the following URL. 

```
http://localhost:4000/?query=beispiel
```

Beside the mandatory **query** parameter, which is used to search for the books and albums, a **limit** parameter can also be added to overwrite the default result limit.


# Environment, Project Description
`Node.js, express, axios, nodemon`

I choosed Node.js as my development environment because I have some experince with it and feel quiet comfortable with Javascript.

To build the REST API I choosed express. I know, that there are other frameworks which might be much more suited for this challenge but I never worked with those.

For the request of the google books and iTunes albums api I used axios. Axios abstracts the requests and allowed me to use Promises for asynchronius functions.

The **index.js** is used to setup the server and initializes the the route to get the books and albums.

The **booksAndAlbums.js** handles all request and checks if mandatory parameters are available. The file requires additional files to model the application.

The **helper files** contain all functions which are used to build the application. 

I did this to be able to compose the application in one file and create all neccessary functions in others. This shall help to understand the application and data flow without being distracted by all implementation details.

I dind't accomplished the whole challenge. The application don't contain the required health check and metrics. My assumption was that this requirement refers to a microservice / container application environment. But I didn't want to implement anything I'm not sure about.


# Integration Plan, Project Journal & Effort
## Tasks
- ✔️ Setup a node project with express
- ✔️ Create a get endpoint with an search query and config to limit results (default 5)
- ✔️ Create an internal API request to Book API & Album API
- ✔️ Send the Book API & Album API response to my endpoint
- ✔️ Map and sort the response
- ✔️ Cancele the Book or Albums request after 1 minute latest
- ️️️️️️️️✔️ expose Book and Album API response metrics

### annotations
- 🔥 I'm not sure about the health check and metrics
  - I assume this is related to microservice & container infrastructure
  - skipped for now due to lack of experience -> focus on stuff I know
- 🔥 I didn't implement tests yet.
  - currently tests aren't part of my workflow and I wasn't sure if I was able to solve the challenge in a reasonable time
  - skipped for now due to lack of experience -> focus on stuff I know


## Journal
I started by evaluating the challenge and created a first Integration Plan, similar to the plan above.

My first integration started as a simple prototype. I did this to make sure, that my intial integration plan works due to my lack of experience. My intention was to avoid extra effort by following a false assumption and invest unecessary work. 

After my implementation plan was working I added additional features like the response metrics and refactored parts of the application to keep it readable and maintainable.

## Effort
| Task                                  | time spent  |
| :---                                  |         ---:|
| Preperation & Setup                   | 0.5h        |
| Prototype / First implementation      | 1.5h        |
| refactoring project structure         | 2h          |
| implementing response metrics         | 1h          |
| documentation                         | 1.5h        |
| **Total**                             | **6.5h**   |



# Challenge Summary  
## Requirements
- get books or albums with a search query
- use the given Google and iTunes apis to receive the data
- return 5 books and 5 albums by default
- response is sorted by title alphabetical
- response contains metrics of the external service requests

## Additional Information
- Book API (Google)   
  - https://developers.google.com/books/docs/v1/reference/volumes/list
- Album API (iTunes)
  - https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/