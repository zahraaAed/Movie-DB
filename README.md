# We're going to build the Codi Movie Database

You've been hired as a junior backend developer for **Codi**, a growing movie streaming service. The company has decided to revamp their existing movie database system for better scalability and security. As part of the development team, you are tasked with the development of a new backend system using **Node.js** and **Express**.


Initially, you'll be working on a proof-of-concept using arrays and objects to simulate a database. Once the proof-of-concept has been approved, you will transition to using **MongoDB** as the database, with **Mongoose** for object data mapping. The final step of your project is to implement a basic **authentication system** to ensure that **only**authorized personnel can interact with the API endpoints.

##Note: We will not create a front end interface for this project

##Learning Objectives


- **Setup a Node.js project:**

 - Identify the purpose and key components of a package.json file.
 - Install project dependencies and libraries using npm.


- **Understand Express.js:**

 - Learn the basics of setting up a server using Express.js.
 - Understand routing and how to handle HTTP requests and responses.


- **Design, create and test APIs:**


 - Create RESTful APIs that allow CRUD operations on a movie database.
 - Understand the role of JSON in API development and how to structure data.
 - Learn how to test APIs response using a tool (Browser console, Postman)


- **Transition to MongoDB and Mongoose:**


 - Install and configure MongoDB.
 - Use Mongoose to create models and schemas.
 - Modify existing API routes to interact with MongoDB.


- **Authentication:**


 - Implement a simple user authentication function
 - Learn how to authorize authenticated users to perform API operations



## Instructions

- **Fork** the [Movie-DB repo](https://github.com/NWC2/Movie-DB)
- **Commit** after each step, call each commit by the name of the step
## Step 1 - Setting up the project  (10x🔑)

- go in the movie-database directory and run `npm init` to create a new project
- answer whatever you like to the questions
- install express: `npm(go google what's npm) install --save express`
- also, install nodemon(go google what's nodemon), it will make things easier: `npm install --save-dev nodemon`
- open the project in your IDE or editor
- edit `package.json` and add the following:
    ```json
        // previous package.json stuff here...
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1", // this should be there
            "dev": "nodemon index.js"
        },
        // next package.json stuff here...
    ```
- create a file "index.js"
- create a file ".gitignore". In this file, write, at the top: `node_modules`. This will prevent the `node_modules` directory to be added to your git repo
- push
- you're set!

## Step 2 - Create a simple express server  (5x🔑)

- with express, create a server, and make it listen on a port of your choice (e.g, `3000`)
- make it so this express server, when receiving an url, answers `ok`
- test your server by running `npm run dev`
- commit ("step 2")

## Step 3 - Create an express simple API (5x🔑)

- with Express, create a route such as, when the url `/test` is invoked, answers: `{status:200, message:"ok"}`
- with Express, create a route such as, when the url `/time` is invoked, answers with: `{status:200, message:<TIME>}`, where `<TIME>` is the current time in hours and seconds like so: `14:20`
- commit ("step 3") 

## Step 4 - Let's complicate the API (5x🔑)

- with Express, create a route such as, when the url `/hello/<ID>` is invoked, answers with: `{status:200, message:"Hello, <ID>"}`, where `<ID>` may be anything the user wanted to pass. The user may also not pass anything.
- with Express, create a route such as, when the url `/search?s=<SEARCH>` is invoked, answers with `{status:200, message:"ok", data:<SEARCH>}` if `<SEARCH>` is provided, and `{status:500, error:true, message:"you have to provide a search"}` if it is not. Be sure to set the *http status* to `500` too.
- commit ("step 4") 

## Step 5 - Set up the basis for CRUD (5x🔑)

- With Express, create four routes: `/movies/create`, `/movies/read`, `/movies/update`, and `/movies/delete`, where these routes can answer anything (we will change it later)
- OPTIONAL: call your routes `movies/add`, `movies/get`, `/movies/edit`, and `/movies/delete`, if you prefer. It doesn't matter
- In your javascript file, create the array of movies:
   ```js
   const movies = [
       { title: 'Jaws', year: 1975, rating: 8 },
       { title: 'Avatar', year: 2009, rating: 7.8 },
       { title: 'Brazil', year: 1985, rating: 8 },
       { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
   ]
   ```
- With Express, make it so that when the url `/movies/read` is requested, you answer with `{status:200, data:<MOVIES> }` where `<MOVIES>` is the list of movies
- commit ("step 5") 

## Step 6 - SEARCH (10x🔑)

- With express, make it so when the url `/movies/read/by-date` is requested, you answer with `{status:200, data:<MOVIES>}`, where `<MOVIES>` is the list of movies *ORDERED BY DATE*
- With express, make it so when the url `/movies/read/by-rating` is requested, you answer with `{status:200, data:<MOVIES>}`, where `<MOVIES>` is the list of movies *ORDERED BY RATING*, where the highest rating is *at the top*.
- With express, make it so when the url `/movies/read/by-title` is requested, you answer with `{status:200, data:<MOVIES>}`, where `<MOVIES>` is the list of movies *ORDERED BY TITLE*
- commit ("step 6") 

## Step 7 - READ ONE (10x🔑)

- With Express, make it so that when the url `/movies/read/id/<ID>` is requested, you answer with `{status:200, data:<MOVIE>}`, where `<MOVIE>` is the movie defined by the provided `<ID>`. If the id doesn't exist, then the answer should be: `{status:404, error:true, message:'the movie <ID> does not exist'}`. Don't forget to set an actual `404` status code. 
- commit ("step 7") 

## Step 8 - CREATE (10x🔑)

- With Express, make it so that when the url `/movies/add?title=<TITLE>&year=<YEAR>&rating=<RATING>`, it:
    1. Creates a *new* movie in the form: `{title: <TITLE>, year: <YEAR>, rating: <RATING>}`
    2. Adds this new movie to the `movies` array
    3. Returns the new list of movies just like for `/movies/read`
- **Checking the Input:**
  - If  `<TITLE>` is missing or `<YEAR>` is missing, send this response:
<br />
 `{status:403, error:true, message:'you cannot create a movie without providing a title and a year'}`
 - If the `<YEAR>` input is:
  - Not made of 4 digits (numbers)
  - Not a number 
<br />
 Also send this response: `{status:403, error:true, message:'you cannot create a movie without providing a title and a year'}`

- If `<RATING>` is missing, set a default rating of `4`
- commit ("step 8")

## Step 9 - DELETE (20x🔑)

- With Express, make it so that when the url `movies/delete/<ID>` is requested, you delete the corresponding movie, and answer with the new list of movies, just like for `/movies/read`. if the id does not exist, answer with `{status:404, error:true, message:'the movie <ID> does not exist'}`
- commit ("step 9") 

## Step 10 - UPDATE (5x🔑)

- With Express, make it so that when the url `/movies/update/<ID>?title=<NEW_TITLE>`, the movie designed by `<ID>` gets it's title changed to `<NEW_TITLE>`. Return the modified array of movies.
- With Express, make it so that when the url `/movies/update/<ID>?title=<NEW_TITLE>&rating=<NEW_RATING>`, the movie designed by `<ID>` gets its rating changed to `<NEW_RATING>`, and its title to `<NEW_TITLE>`. If a user provides any of `title`, `rating`, or `year`, the movie should change to reflect those modifications. Fields that the user did *not* provide should not change. In the example here, the `year` of the movie should *not* change, as the user only provided `title` and `rating`.
- commit ("step 10") 

## Step 11 - Use HTTP Verbs  (5x🔑)

- change the urls to use **HTTP VERBS** (look it up. Google "rest APIs", and see "how to build REST APIs with Express")
- commit ("step 11") 

## Step 12: Data Persistence  (5x🔑)

- We need to improve our application by saving our data in a [MongoDB](https://www.mongodb.com/atlas/database) database using the [Mongoose](https://mongoosejs.com/docs/guide.html) library instead of using variables. **(Check the resources below!)**

- Update all the APIs (functions) we created previously to perform the CRUD operations on the MongoDB database.

- commit ("step 12") 

## Step 13: Authentication  (5x🔑)

- Create a CRUD operation but for users (same as the one for movies, but with a users array that takes objects with usernames and passwords)
<br />
<kbd>const users = [ 
 { username: 'John', password: '1234' },
 { username: 'Jane', password: '5678' } ]; </kbd>

- Only allow an authenticated used to modify or delete movies
- commit ("step 13") 
<br />
**Note:** You don’t need to use `MongoDB` or any other library for this step 


##Deliverables

Github repository link with the proper code and commit following each step


##Resources

- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
- https://www.mongodb.com/docs/
- https://www.youtube.com/watch?v=s0anSjEeua8

