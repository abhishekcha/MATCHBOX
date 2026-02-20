create a repo.
intitalize a repo.
install express.
create a server.
listen to port 3001.
write logic to handle get post patch delete api calls and test them on postman.
explore rounting and use of ?, +, (), * in the routes
use of regex in routes /a/, /.*fly$/
reading the query params in the routes
read the dynamic routes
handling the multiple route handler..
using next() function in router
read about middlewafre in express.js
how express js handle request bts(behind the sence),
different between app.use and app.all()
Error handling using app.use("/",(err,req,res,next)=>{}) note->always write at the end.


craete a free cluster on mongodb official website (mongo atlass)
install mongoose lib
connect your application to the db <connection-url>/matchBox
call thhe connectDb function and connect ot database before starting application on 3001.
create a user schema in your project and user model
create  POST /signup API to add data to database
push some document using API call from postman
error handling using try and catch.

JS object vs JSON (difference)
add the express.json middleware to your app
make your signup API dynamic to recive data from the end user
User.FindOne with duplicate email ids
API - feed API - GET /feed - get all the users from the database.
create a delete user API.
write a logic to handle GET POST PATCH DELETE API calls and test them on postman.
 difference between patch and put.
 create a delete user API
 explore the mongoose doc for model  

explore schema type from the doc...
add required , unique, lowercase, min, minLength, trim
add default
create a customs validatye function for gender
improve the DB schema - put all appropriate validation on each field in schema
add timestamps to the userSchema
add API level validation on patch request & signup post API
Data sanitizing-  add API validation for each field.
install validator
explore validator lib function and use validator func for password , email and etc(schema)
 never trust res.body..
 validate data in signup API
 install bcrypt library
 create a passwordhash using bcrypt.hash and save the user.
 compare password and throw errors if email or password is invalid.
 
 install cookie parser
 jsut send a dummy cookie to user
 create GET /profile API and check if you get a cookie back
 install jsonwebtokens
 in login api ,after email and password validation create a jst tokens and send it back to user
 read the cookie inside ypur profile api and find the logged in user
 userAuth middleware
 add the userAuth middleware in profile api and a new connection requesst api
 set the expiry of jwt token and set to 10 days 

 create userschema method top getJWT()
 
 explore for express.Router
 create routes folder for managing auth profile request royters
 create authRouter and many more in auth.js
 import these router in app.js
 create POST /logout API
 create PATCH /profile/edit
 test all API
 create PATCH /profile/password API => forgot password API
 make you validate all data in every POST ,PATCH APIS
 
 read more about index in mongoDb.
 why do we need index.
 what is advanatge and disadvantages of creating index
 think about corner cases.
 
 write code with proper validation for post /request/review/:status/:requestId
 thought process -> post vs get  
read about ref and populate... both work as a relation ..
create GET /request/recieved

