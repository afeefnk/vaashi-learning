const express = require("express");
const { addCourse, getCourses, getVideosByCourse, getAllStudents, deleteCourseVideo } = require("../controllers/courseController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addcourse", verifyToken, addCourse);
router.get("/getcourses", verifyToken, getCourses);
router.get("/getcoursevideos", verifyToken, getVideosByCourse);
router.get("/students", verifyToken, getAllStudents);
router.delete("/:videoId", verifyToken, deleteCourseVideo);


module.exports = router;
