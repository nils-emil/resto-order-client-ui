const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const http = require('http');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;mongoose.connect("mongodb://mongo:27017/app");

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
   });
var User = mongoose.model("User", nameSchema);  

app.get('/persons', function(req, res) {
    User.find({}, function(err, users) {
      res.send(JSON.stringify(users));  
    });
  });

app.use("/add", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });

app.post("/addname", (req, res) => {
    myData.save()
    .then(item => {
        console.log(item)
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
   });

app.listen(3000);


