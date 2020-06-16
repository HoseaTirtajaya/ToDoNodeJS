var bodyparser = require("body-parser");
var mongoose = require("mongoose");
//Connection String in MongoDB Compass: mongodb+srv://extillius:<password>@cluster0-a7wze.mongodb.net/test

// var data = [
//   { item: "Get Milk" },
//   { item: "Walk dog" },
//   { item: "Kick some coding ass" },
// ];

//Connect to database
var uridata =
  "mongodb+srv://extillius:root123@cluster0-a7wze.mongodb.net/todolist?retryWrites=true&w=majority";
//URI: mongodb+srv://extillius:<password>@cluster0-a7wze.mongodb.net/<dbname>?retryWrites=true&w=majority(Taken from atlas, connect, application connect)
mongoose.connect(uridata);

//Create a Schema(Like a blueprint)
var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model("Todo", todoSchema);
// var itemOne = Todo({ item: "Buy Flowers!" }).save((err) => {
//   if (err) {
//     throw err;                   THIS IS HOW YOU ADD COLLECTION IN MONGO DB, THE COLLECTION WILL BE todos
//   }                              the collection data will be like this
//   console.log("Item Saved!");      _id: ObjectId("unique key");
// });                                  item: "Buy Flowers!"(MongoDB is using json as a database not a column-row type)

var urlencodedParser = bodyparser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get("/todo", (req, res) => {
    // console.log(req.url);
    // Get Data from mongodb and pass it to view
    //Specifying which model/collection will be used.
    // Todo.find({ item: "Buy Flowers" }); This is finding a specific item in collection
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("../view/todo.ejs", { todos: data });
    });
    // res.render("../view/todo.ejs", { todos: data }); staticc data from dummy object
  });

  app.post("/todo", urlencodedParser, (req, res) => {
    // console.log(req.url);
    //adding a controller that handles all the POST request from user.
    // data.push(req.body);
    // res.json(data);
    //Get data from view and add it to mongodb
    var newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  //DELETE HTTP METHOD
  app.delete("/todo/:item", (req, res) => {
    //Delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(
      (err, data) => {
        if (err) throw err;
        res.json(data);
      }
    );

    // data = data.filter((todo) => {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });                  deleting data from dummy data
    // res.json(data);
  });
};
