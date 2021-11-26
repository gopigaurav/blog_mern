const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  loginType:{
    type: String,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png",
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;