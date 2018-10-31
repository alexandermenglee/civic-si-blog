var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema(
  {
    Title: String,
    Body: String,
    Image: String,
    created: {
      type: Date, default: Date.now
    }
  }
);


module.exports = mongoose.model("Blog", blogSchema);
