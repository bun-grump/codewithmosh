const os = require("os");

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log("Total Memory: " + totalMemory);

console.log(`Free Memory: ${freeMemory}`);

const path = require("path");

var pathObj = path.parse(__filename);
console.log(pathObj);

const fs = require("fs");

// const files = fs.readdirSync("./");
// console.log(files);

const files = fs.readdir("./", function (err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});

const EventEmitter = require("events");

const Logger = require("./logger");
const logger = new Logger();

// Register a Listener

logger.on("messageLogged", (arg) => {
  console.log("Listener Called", arg);
});
// emitter.on("messageLogged", function (arg) {
//   console.log("Listener Called", arg);
// });

logger.log("message");

const http = require("http");
const { Socket } = require("dgram");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);
console.log("Listening on port 3000...");
