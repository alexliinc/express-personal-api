var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI ||
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  "mongodb://localhost/personal-api");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Movie = require("./movie.js");

// module.exports.Campsite = require("./campsite.js.example");
