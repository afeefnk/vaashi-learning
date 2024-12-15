const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type:String,
    enum: ["student","admin"],
    default: "student"
  },
  course: {
    type: String,
    enum: [
      "10th", "11th Science", "11th Commerce", "11th Humanities",
      "12th Science", "12th Commerce", "12th Humanities"
    ],
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
