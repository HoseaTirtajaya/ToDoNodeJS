//Start of setting express app
var express = require("express");
//init controller
var todoController = require("./controller/todoController");

var app = express();

//static files
app.use(express.static("./public"));

//Start of view engine init.
app.set("view engine", "ejs");

//FIRE CONTROLLER
todoController(app);

//Listening to a port
app.listen(3000);
console.log("You are listening to port 3000");
