# Node.js Movie API

App was build with `TypeScript` and `Node.js` environment. Using `Express.js` provided set of features for build solid
API which connect with `MongoDB` database, thanks to `mongoose` tool. Tests were written with use of `mocha`, `chai`, `supertest` and `MongoMemoryServer`. API is dockerized and the documentation was created with `swagger`.

# Run locally with docker

1. Clone this repository
2. Run from root dir

```
docker-compose up -d
```

By default the API' ll start on 8080 port and JWT_SECRET is "secret" but you can override it.

```
APP_PORT=8081 JWT_SECRET=secret docker-compose up -d
```

MongoDB starts on **27017** port. If you want to change **ENV**, let edit *.env* file in root directory.
Only for presentation *.env* is public. 

# Run locally with npm

App can be start also without Docker, only with Node.js and npm.

## Prerequisites

You need to have `MongoDB` instance on your OS. You can also run app locally but containerize only database with command:

```
docker-compose up -d db
```

All **ENV** you can find in [*./env*](/.env)

If the database exists and **ENV's** are fine, then you can install dependencies and run app in `production` or `developer` mode.

## Developer mode

```
npm i
npm run dev
```

## Production mode

```
npm i
npm run build
npm start
```

# Tests

For start tests you should have installed all dependencies and run command:

```
npm test
```

# CI/CD

App has working CI/CD pipeline that runs the tests. In GitHub [Pull requests](https://github.com/BartekCK/movie-api/pulls) tab you can find examples with a pipeline.

# API docs

You can see API documentation with `swagger` after starting the application, on URL
[`http://localhost:8080/docs/`](http://localhost:8080/docs/).

![alt text](https://i.ibb.co/JK8s8yD/Swagger.png)
For use routes, user should be authorized, you can make it just like the picture below
(Remember to add prefix **Bearer** and than **JWT**)<br />
**Example:**

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzNCwibmFtZSI6IlByZW1pdW0gSmltIiwicm9sZSI6InByZW1pdW0iLCJpYXQiOjE2MTM4NTc4NTMsImV4cCI6MTYxMzg1OTY1MywiaXNzIjoiaHR0cHM6Ly93d3cubmV0Z3VydS5jb20vIiwic3ViIjoiNDM0In0.GZqNVfaRkexvnAbdBlXAP6Ojh8-r1IChTmqZmd3GL4E
```

![alt text](https://i.ibb.co/SBcWzZh/Swagger-auth.png)

## GET request
- [x] Fetch a list of all movies created by an authorized user
- [x] Return 404 if user don't have any movies

```
http://localhost:8080/api/v1/movies
```

return auth user movies. Example curl:

```
curl -X GET "http://localhost:8080/api/v1/movies" -H  "accept: application/json" -H  "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzNCwibmFtZSI6IlByZW1pdW0gSmltIiwicm9sZSI6InByZW1pdW0iLCJpYXQiOjE2MTM4NTc4NTMsImV4cCI6MTYxMzg1OTY1MywiaXNzIjoiaHR0cHM6Ly93d3cubmV0Z3VydS5jb20vIiwic3ViIjoiNDM0In0.GZqNVfaRkexvnAbdBlXAP6Ojh8-r1IChTmqZmd3GL4E"
```

200 Response:

```json
[
  {
    "_id": "603184f9f3bf7b0019df2250",
    "userId": 434,
    "title": "The Godfather",
    "released": "1972-03-24T00:00:00.000Z",
    "genre": "Crime, Drama",
    "director": "Francis Ford Coppola"
  }
]
```

401 Response:<br />
`Details: Unauthorized`<br />

404 Response:
```json
{
  "message": "User by Id 123 don't have any movies"
}
```
## POST request

- [x] Basic users are restricted to create a 5 movies per a month (calendar month)
- [x] Premium users have no limits
- [x] Title in body can't be undefined
- [x] User can't add the same movie
- [x] User must be authorized
- [x] Additional data about a movie is fetch from OMDb API
- [x] Authorization is with Bearer token in header


```
http://localhost:8080/api/v1/movies
```

For save user movie make POST request. Example curl:

```
curl -X POST "http://localhost:8080/api/v1/movies" -H  "accept: application/json" -H  "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzNCwibmFtZSI6IlByZW1pdW0gSmltIiwicm9sZSI6InByZW1pdW0iLCJpYXQiOjE2MTM4NTc4NTMsImV4cCI6MTYxMzg1OTY1MywiaXNzIjoiaHR0cHM6Ly93d3cubmV0Z3VydS5jb20vIiwic3ViIjoiNDM0In0.GZqNVfaRkexvnAbdBlXAP6Ojh8-r1IChTmqZmd3GL4E" -H  "Content-Type: application/json" -d "{  \"title\": \"The Godfather\"}"
```

201 Response:
```json
{
  "_id": "603184f9f3bf7b0019df2250",
  "userId": 434,
  "title": "The Godfather",
  "released": "1972-03-24T00:00:00.000Z",
  "genre": "Crime, Drama",
  "director": "Francis Ford Coppola"
}
```
400 Response:
```json
{
  "message": "Basic Thomas you should add movie title"
}
```
401 Response:<br />
`Details: Unauthorized`<br />
403 Response:
```json
{
  "message": "User Basic Thomas with basic account can add only 5 movies on month"
}
```
403 Response:
```json
{
  "message": "Movie not found!"
}
```
409 Response:
```json
{
  "message": "User with id 123 has this movie in his collection"
}
```

# Summary
- [x] Api with Express.js and MongoDB
- [x] Tests
- [x] CI/CD
- [x] Dockerized App
- [x] Documentation of API
