// Require File System Module
const fs = require("fs");

const hello = "Hello World";
// console.log(hello);

// Reading files
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// Writing files
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("File written!");
