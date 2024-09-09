// Program 1

const http = require("http");

const PORT = 3000;

const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.write(200);
    res.end("Hello, World!");
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

// Program 2

const math = require("./mathOperations");
console.log(math.add(5, 3)); // 8
console.log(math.subtract(10, 7)); //3
console.log(math.multiply(5, 7)); //35
console.log(math.divide(25, 6)); // 4.166666666666667

// Program 3

const path = require("path");
const fs = require("fs");

const updatedData = "\nHello, Node!";

const readFileFunction = (updatedData) => {
  fs.readFile(path.join(__dirname, "input.txt"), (err, data) => {
    if (err) {
      console.log("Error in reading file.", err);
    } else if (updatedData) {
      console.log("After appending: " + data);
    } else {
      console.log("Before appending: " + data);
    }
  });
};

readFileFunction();

fs.appendFile(path.join(__dirname, "input.txt"), updatedData, (err, data) => {
  if (err) {
    console.log("Error in writing file.", err);
  }
  console.log("Line added successfully.");

  readFileFunction(true);
});
