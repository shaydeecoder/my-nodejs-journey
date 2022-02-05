// Require File System Module
const fs = require("fs");
const http = require("http");
const url = require("url");

/////////////////////////////////////////
// FILES

// Reading files synchronously
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// Writing files synchronously
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

// Reading files asynchronously
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR! 💥");

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);

//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written!");
//       });
//     });
//   });
// });
// console.log("Will read file!");

/////////////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Create a server
const server = http.createServer((req, res) => {
  // Send response to client-side
  // res.end("Hello from the server!");

  // Routing
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    /* fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);

      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    }); */

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

// Listen to a server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
