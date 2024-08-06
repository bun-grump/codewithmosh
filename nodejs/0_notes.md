## NPM packages

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

### logging

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
