var mongoose = require("mongoose");

var date = new Date();
var hr = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const d = new Date();
var mon = monthNames[d.getMonth()];
var ampm = date.getHours() >= 12 ? "pm" : "am";
var userSchema = mongoose.Schema({
  title: { type: String },
  category: { type: String },
  email: { type: String },
  date: {
    type: String,
    default: date.getDate() + " " + mon + " " + date.getFullYear(),
  },
  time: {
    type: String,
    default: hr + ":" + date.getMinutes() + ampm,
  },
  imageupload: { type: String },
  comment: { type: Array },

  versionKey: false,
});
module.exports = mongoose.model("fileupload", userSchema);
