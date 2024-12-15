const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  course: { 
    type: String, 
    enum: [
      "10th", "11th Science", "11th Commerce", "11th Humanities",
      "12th Science", "12th Commerce", "12th Humanities"
    ],
    required: true,
  },
  subject: { type: String, required: true },
});

module.exports = mongoose.model("Course", CourseSchema);
