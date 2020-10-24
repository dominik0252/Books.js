var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookDatabase');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  affiliation: String
});

var bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  year: Number,
  authors: [authorSchema]
});

module.exports = mongoose.model('Book', bookSchema);