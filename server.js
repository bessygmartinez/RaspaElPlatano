const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const logger = require("morgan");
const axios = require("axios");

//Initialize Express
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//MongoDB
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });

const db = mongoose.connection;
db.on("err", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful")
});

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
const Comment = require("./models/Comment.js");
const Article = require("./models/Article.js");
const router = require("./controllers/controller.js");
app.use("/", router);


//App Launch
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  module.exports = app;
