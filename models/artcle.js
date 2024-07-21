const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Article", articleSchema);
