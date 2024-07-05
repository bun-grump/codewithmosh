# check node version

node -- version

# if haven't install node, go to nodejs.org

# then run

node app.js

# scan js code errors

jshint app.js

# export object

module.exports.log = log

# export a single function

module.exports = log

# import module

const logger = require('./logger'); # use './logger' for current folder, './subfolder/logger' for child folders and '../logger' for parent folder
logger.log('message')

# installing packages https://www.npmjs.com/

npm i packagename
npm i packagename@2.4.2

npm i # install all packages in package.json
npm i --only=prod # install only regular dependencies
npm i --only=dev # install only dev dependencies
npm i -g packagename # install package globally

npm un mongoose # uninstall packages
npm un -g mongoose

# ignore node_modules with git

create .gitignore
node_modules/

# list all installed packages and their dependencies

npm list
npm list --depth=0

# viewing registry info for a package

npm view packagename
npm view mongoose dependencies
npm view mongoose versions

# check outdated packages

npm outdated
npm -g outdated
npm update

# update all to newest version

npm i -g npm-check-updates # install cli tool to check updates globally
npm-check-updates
ncu -u # update package.json
npm i

# development dependencies, unit test, analyze js code, scan for errors etc, these should not go in production

# scan js errors, specifiy development dependency

npm i jshint --save-dev

# publishing a package

makedir lion-lib
cd lion-lib
npm init --yes #create package.json file, then create index.js and write function
npm adduser # create account
npm login # log in
npm publish

# update a published package, need to update version according to the update, can do it manually in the package.json file or run following

npm version major
npm version minor
npm version patch
npm publsih

# configuration

default.json
development.json
production.json

custom-environment-variables.json # store the mapping here

# setting environment variables

export PORT=5000 # mac
export NODE_ENV=development
set PORT=5000 # windows command prompt
$env:PORT=5000 # windows powershell
$env:NODE_ENV="development"

# configuration

default.json
development.json
production.json

custom-environment-variables.json # store the mapping here

# Debugging

$env:DEBUG="app:startup"
$env:DEBUG="app:startup","app:db"
$env:DEBUG="" # debug nothing
$env:DEBUG="app:\*" # wildcard
DEBUG=app:db nodemon index.js # only works for mac

# templating engines

to return HMTL template to the client, use templating engines pug, mustache, ejs

# database integration

https://expressjs.com/en/guide/database-integration.html

# structuring express applications

create a folder called routes and put all the router inside (home, courses)
create a folder called middleware and put all the middleware inside (logger)

# MongoDB

mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray # import using command prompt

# Transaction/Two phase commit

fawn has been obsolete
use mongoose transaction

# Object ID

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

# Lodash

utilities functions
pick # pick properties

# password validation

joi-password-complexity
