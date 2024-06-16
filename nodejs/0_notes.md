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

# setting environment variables

export PORT=5000 # mac
export NODE_ENV=development
set PORT=5000 # windows command prompt
$env:PORT=5000 # windows powershell
$env:NODE_ENV="development"
$env:app_password=1234

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
