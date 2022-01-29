// Require File System Module
const fs = require("fs");
const http = require("http");

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

// Create a server
const server = http.createServer((req, res) => {
  // Send response to client-side
  res.end("Hello from the server!");
});

// Listen to a server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
