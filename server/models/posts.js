const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: [{ type: ObjectId, ref: "users" }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);
module.exports = PostMessage;
