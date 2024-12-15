const Course = require("../models/Course");
const User = require("../models/User");

exports.addCourse = async (req, res) => {
  const { title, description, videoUrl, course, subject } = req.body;

  try {
    const newCourse = new Course({ title, description, videoUrl, course, subject }); // Use a different variable name
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully." });
  } catch (error) {
    console.error("Error adding course:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error." });
  }
};



exports.getCourses = async (req, res) => {
  try {
    if (req.user.role === "student") {
      const student = await User.findById(req.user.id);
      if (!student) return res.status(404).json({ message: "Student not found." });

      // Fetch only relevant courses for the student
      const courses = await Course.find({
        course: student.course,
        subject: { $in: student.subjects }, // Matches any subject in student's subject array
      });

      return res.status(200).json(courses);
    }

    // For admins, return all courses
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

exports.getVideosByCourse = async (req, res) => {
  try {
    // Check if the user is an admin or a student
    if (req.user.role === "student") {
      // Fetch videos for the student's course
      const userCourse = req.user.course;
      const videos = await Course.find({ course: userCourse });

      return res.status(200).json(videos); // Return videos for the student's course
    }

    // If the user is an admin, return all videos
    const allVideos = await Course.find();
    return res.status(200).json(allVideos); // Return all videos if the user is an admin
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

// In your controller file
exports.getAllStudents = async (req, res) => {
  try {
    // Ensure the user is an admin before proceeding
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    // Fetch all students
    const students = await User.find({ role: "student" }).select("username email course"); // Select only required fields (name, email, course)
    
    if (!students) {
      return res.status(404).json({ message: "No students found." });
    }

    return res.status(200).json(students); // Return student data
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

exports.deleteCourseVideo = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can delete videos." });
    }

    const { videoId } = req.params;

    const deletedVideo = await Course.findByIdAndDelete(videoId);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found." });
    }

    res.status(200).json({ message: "Video removed successfully." });
  } catch (error) {
    console.error("Error deleting video:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};
