// const http = require("http");
// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello World");
//   })
//   .listen(8080);

// const os = require("os");
// console.log(os.hostname());
// console.log(os.platform());
// console.log(os.homedir());

// Sync File Read:-
// const fs = require("fs");

// console.log("1. Starting sync read...");
// const data = fs.readFileSync("myfile.txt", "utf8");
// console.log("2. File contents:", data);
// console.log("3. Done reading file");

// Async File Read:-
// const fs = require("fs");

// console.log("1. Starting async read...");
// fs.readFile("myfile.txt", "utf8", (error, data) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log("2. File contents:", data);
// });
// console.log("3. Done starting read operation");

// console.log(`V8 version: ${process.versions.v8}`);

// Promises:-
// const fs = require("fs").promises;

// console.log("1. Reading file...");
// fs.readFile("myfile.txt", "utf8")
//   .then((data) => console.log("3. File content:", data))
//   .catch((error) => console.error("Error:", error));
// console.log("2. This runs before file is read!");

// const fs = require("fs").promises;
// const promise1 = Promise.resolve("First result");
// const promise2 = new Promise((resolve, reject) =>
//   setTimeout(() => resolve("Second result"), 1000)
// );
// const promise3 = fs.readFile("myfile.txt", "utf8");

// Promise.all([promise1, promise2, promise3])
//   .then((results) => {
//     console.log("Results:", results);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Async/Await:-
// const fs = require("fs").promises;

// async function readFiles() {
//   try {
//     console.log("Reading file...");
//     const data = await fs.readFile("myfile.txt", "utf8");
//     console.log("File content:", data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
// readFiles();

// async function getData() {
//   console.log("Starting...");
//   const result = await someAsyncOperation();
//   console.log(`Result: ${result}`);
//   return result;
// }

// function someAsyncOperation() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve("Operation completed"), 1000);
//   });
// }

// getData().then((data) => console.log("Final data:", data));

// HTTP Server:-
// const http = require("http");
// const PORT = 5000;

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "content-type": "text/html" });
//   res.end("<h1>Hello World</h1>");
// });

// server.listen(PORT, "localhost", () =>
//   console.log(`Server running on port: ${PORT}`)
// );

// const http = require("http");
// const PORT = 5000;

// const server = http.createServer((req, res) => {
//   const { method, url } = req;
//   res.writeHead(200, { "content-type": "text/plain" });
//   res.end(`You made a ${method} request to ${url}`);
// });

// server.listen(PORT, "localhost", () =>
//   console.log(`Server running on port: ${PORT}`)
// );

// URL module:
const http = require("http");
const url = require("url");
const PORT = 5000;

const server = http.createServer((req, res) => {
  const parsedURL = url.parse(req.url, true);
  // 'true' is used to tell Node.js to parse the query string into an object.
  const pathname = parsedURL.pathname;
  const query = parsedURL.query;
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify(
      {
        pathname,
        query,
        fullUrl: req.url,
      },
      null,
      2
    )
  );
  // JSON.stringify(value, replacer, space)
});

server.listen(PORT, "localhost", () =>
  console.log(`Server running on port: ${PORT}`)
);
