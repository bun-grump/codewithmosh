## NPM node package manager

### check node version

```bash
node -- version
```

### if haven't install node, go to nodejs.org

### then run

```bash
node app.js
```

### scan js code errors

```bash
jshint app.js
```

### export object

```js
module.exports.log = log;
```

### export a single function

```js
module.exports = log;
```

### import module

```js
const logger = require("./logger"); // use './logger' for current folder, './subfolder/logger' for child folders and '../logger' for parent folder
logger.log("message");
```

### installing packages https://www.npmjs.com/

```bash
npm i packagename
npm i packagename@2.4.2

npm i # install all packages in package.json
npm i --only=prod # install only regular dependencies
npm i --only=dev # install only dev dependencies
npm i -g packagename # install package globally

npm un mongoose # uninstall packages
npm un -g mongoose
```

### ignore node_modules with git

create .gitignore
node_modules/

### list all installed packages and their dependencies

```bash
npm list
npm list --depth=0
```

### viewing registry info for a package

```bash
npm view packagename
npm view mongoose dependencies
npm view mongoose versions
```

### check outdated packages

```bash
npm outdated
npm -g outdated
npm update
```

### update all to newest version

```bash
npm i -g npm-check-updates # install cli tool to check updates globally
npm-check-updates
ncu -u # update package.json
npm i
```

### development dependencies, unit test, analyze js code, scan for errors etc, these should not go in production

### scan js errors, specifiy development dependency

```bash
npm i jshint --save-dev
```

### publishing a package

```bash
makedir lion-lib
cd lion-lib
npm init --yes # create package.json file, then create index.js and write function
npm adduser # create account
npm login # log in
npm publish
```

### update a published package, need to update version according to the update, can do it manually in the package.json file or run following

```bash
npm version major
npm version minor
npm version patch
npm publsih
```

## Express API

### configuration

```bash
npm i config
```

then create a folder called config
then create the following three files

default.json
development.json
production.json

custom-environment-variables.json ### store the mapping here

then use confg.get("environment name")

### setting environment variables

```bash
export PORT=5000 # mac
export NODE_ENV=development
set PORT=5000 # windows command prompt
# windows powershell temporary
$env:PORT=5000
$env:NODE_ENV="development"
### windows powershell permanent
[System.Environment]::SetEnvironmentVariable("MY_VARIABLE", "value", "User")


Get-ChildItem Env: # list of existing variables
Remove-Item Env:\MYVAR # remove variable
```

### configuration

default.json
development.json
production.json

custom-environment-variables.json ### store the mapping here

### Debugging

```bash
$env:DEBUG="app:startup"
$env:DEBUG="app:startup","app:db"
$env:DEBUG="" # debug nothing
$env:DEBUG="app:\*" # wildcard
DEBUG=app:db nodemon index.js # only works for mac
```

### templating engines

to return HMTL template to the client, use templating engines pug, mustache, ejs

### database integration

https://expressjs.com/en/guide/database-integration.html

### structuring express applications

create a folder called routes and put all the router inside (home, courses)
create a folder called middleware and put all the middleware inside (logger)

## MongoDB

```bash
mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray # import using command prompt
```

### Transaction/Two phase commit

fawn has been obsolete
use mongoose transaction

### Object ID

\_id: 66872f2e4d41b955fad7b7c7 (24 characters, 12 bytes)
first 4 bytes: timestamp
next 3 bytes: machine identifier
next 2 bytes: process identifier
next 3 bytes: counter

each 1 byte there are 8 bits(each bit either 0 or 1)
2^8 = 256, so with 1 byte we can store 256 different numbers
2^8^3 = 2^24 = 16M
so with the same machine same process, we generate more than 16M documents
then counter will overflow and generate same object ID, so very unlikely

joi-objectid no longer works, use Joi.string().hex().length(24)

### Lodash

utilities functions
pick ### pick properties

## authentication and authorization

### password validation

joi-password-complexity

### hashing password

```bash
npm i bcrypt
```

### json web token

npm i jsonwebtoken
Never store private keys and other secrets in your codebase. Store them in environment variables. Use the config package to read application settings stored in environment variables.
everytime the user register or login we generate a token
token can be set as response header
encapsulate payload logic in mongoose models (schema method)

### middleware

stored in the "middleware" folder

either terminate the request response life cycle or pass to the next middleware function

```js
function auth(req, res, next) {
  if (a) return res.status(401).send("Error Mesaage");
  else next();
}
```

the authenticating middleware should not be public, so only available in certain modules, not index.js11

### status

200 successful
400 bad request
401 unauthorized ### invalid json web token, can try again
403 forbidden ### valid json web token, but not authorized, dont try again
404 not found

## handling and logging errors

### route exception handler

#### async middleware

use to handle exception for route handler

```js
module.exports = function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(res, req);
    } catch (ex) {
      next(ex);
    }
  };
};
```

### express-async-errors

```bash
npm i express-async-errors
```

this package works similarly as async middleware
if it doesnt work, then we use the async middleware

### error logging

#### winston package

- console (default)
- file
- http

database plug in

- mongodb
- couchdb
- reids
- loggly

logging levels

- error
- warn
- info
- verbose
- debug
- silly

### catching errors within express

error middleware

```js
const winston = require("winston");

// this only catches express request processing pipeline
// if error is thrown outside of express, then it will not be caught here
module.exports = function (err, req, res, next) {
  // log the exception
  winston.error(err.message, err);
  res.status(500).send("something failed"); // internal server error
};
```

then use it in index.js

```js
app.use(error);
```

### catching errors outside of express (syncronus)

will need to use process and winston to catch and log errors outside of express

```js
// using process and winston to catch and log errors outside of express
winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

// throw and exception when there's a rejected promise so winston can catch it
process.on("unhandledRejection", (ex) => {
  throw ex;
});
```

### extracting details into seprate modules

create a folder "startup" and store all the modules there

```js
require("./startup/logging"); //load this first to log any error when loading the other modules
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");
require("./startup/validation");
```

## automated testing

- unit (test application without any external dependencies)
- integration (test with external dependencies, files, databases and so on)
- end-to-end (drives an application throught its UI, greatest amount of confident, but very slow, brittle)

### takeaways

- favour unit tests to e2e tests
- cover unit test gaps with integration tests
- use e2e tests sparingly

### tool

framework

- jasmine (oldest)
- mocha (plug in to use together: chai, sinon)
- jest (wrapper around jasmine, preferred framework)

## unit testing with jest

```bash
npm i jest --save-dev
```

in package.json file, add the following

```json
{
  "devDependencies": {
    "jest": "^29.7.0"
  },
  "scripts": {
    "test": "jest"
  }
}
```

create a "test" folder to store all the test files
the "test" folder should micmic the project folder structure

- lib.test.js

then run the test using cli

```bash
npm test
```

### for unit test, the number of test for a function is greater than execution path

make sure the test is not too specifcic or too general
can use regular expression to match certain patterns

### need to use toEqual/toMatchObject when testing objects

toEqual matches all the attributes
toMatchObject only matches the overlapping attributes

### automatically test running when files are changed

```json
{
  "devDependencies": {
    "jest": "^29.7.0"
  },
  "scripts": {
    "test": "jest --watchAll --verbose"
  }
}
```

the watchall flag will initiate run once any changes are saved
the verbose flag will output more info

### mock function

when unit testing a function that depend on external database
we can create a mock function to override the original function

### jest mock function

```js
db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
mail.send = jest.fn();
```

using jest mock function, we can check whether the function is called
we can also check the arguments that were passed to that function

```js
expect(mail.send).toHaveBeenCalled(); //asserting the mock function was called
expect(mail.send.mock.calls[0][0]).toBe("a"); // asserting arguments passed to this function, first call first argument
expect(mail.send.mock.calls[0][1]).toMatch(/order/); // first call second argument
```

## integration test

### need to first set up test db

in test.json, add the test db

```json
{
  "jtwPrivateKey": "1234",
  "db": "mongodb://localhost/vidly_tests"
}
```

### install supertest for integration test

```bash
npm i supertest --save-dev
```

### export the server object and load to our test file

### add --coverage flag to check test coverage

```json
  "scripts": {
    "test": "jest --watchAll --verbose --runInBand --coverage"
  },
```

can open index.html in the coverage folder to see clearer
