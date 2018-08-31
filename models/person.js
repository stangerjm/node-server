const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
  name: String,
  age: Number
});

let Person = mongoose.model("Person", PostSchema);
module.exports = Person;