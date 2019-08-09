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
The difference between both are, that the development mode uses nodemon to restart the application on any file changes.

```
#dev
npm run dev
```
```
#prod
npm start
```


# Environment, Project Description
`Node.js, express, axios, nodemon`

I choosed Node.js as my development environment because I have some experince with it and feel quiet comfortable with Javascript as my programming language.

To build the REST API I choosed express. I know, that there are other frameworks which might be much more suited for this challenge but I never worked with those.

## Application Structure
Each end point makes its own directory containing a router and a controller.

The router takes care about the url and the used controller.

The controller receives the request and response object provided by the router.
It takes care about the response its status and the requests to the upstream service.
The controller also models the data as required.

For commonly used functions the utils directory contains array and request/response helper.

```
index.js
|- app
  |- albums
    |- controller.js
    |- router.js
  |- books
    |- controller.js
    |- router.js
  |- utils
    |- arrayHelper.js
    |- requestResponseHelper.js
```


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

## Response Objects Structure
- status
- statusText
- responses
  - type
  - status
  - statusText
- data
  - title
  - author/artist
  - type

## Journal
I started by evaluating the challenge and created a first Integration Plan, similar to the plan above.

My first integration started as a simple prototype. I did this to make sure, that my intial integration plan works due to my lack of experience. My intention was to avoid extra effort by following a false assumption and invest unecessary work. 

First, Iimplemented the books route and added the request to the google books api. As soon as I was able to request the books with an API Key I finalized the request and modeled the response as required.

As soon as I proofed my integration idea I refactored the application to its current structure and added the album endpoint baed on my gained experience.

After all endpoints were available I reviewed my implementation and improved it by refactoring further.
Besides minor changes I also changed the way the router and the controller interacts with each other. 

In my first integration the router was responsible to veryfy the request and response. I changed this by handing over the request and response objects to the controller. Now the controller takes care of the application logic and the router is used to define the configuration for the endpoint.

## Effort
| Task                                  | time spent  |
| :---                                  |         ---:|
| Preperation & Setup                   | 0.5h        |
| Prototype / First implementation      | 1.5h        |
| refactoring project structure         | 1.5h        |
| adding album endpoint                 | 1h          | 
| additional improvements & refactoring | 1h          |
| documentation                         | 1.5h        |
| refactoring with additional knowledge | 1h          |
| implementing response metrics         | 1h          |
| additional refactoring                | 2h          |
| reimplementing due to lost data       | 1.5h        |
| **Total**                             | **12.5h**   |



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