var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  first: { type: String },
  last: { type: String },
},
{ versionKey: false });
module.exports = mongoose.model("registration", userSchema);
