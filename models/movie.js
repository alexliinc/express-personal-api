// require
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: String,
  staring: String,
  releaseDate: String
});

var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
