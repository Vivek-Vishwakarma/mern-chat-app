const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    name: { type: String, requied: true },
    email: { type: String, requied: true, unique: true },
    password: { type: String, requied: true },
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg",
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userModel);
module.exports = Users;
