const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegionSchema = new Schema({
  name: String,
  code: String
});

let Region = mongoose.model("Region", RegionSchema);
module.exports = Region;