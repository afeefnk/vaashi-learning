const express = require("express");
const router = express.Router();

const subjectsConfig = {
  "12th Science": ["Maths", "Physics", "Chemistry", "Biology", "Computer Science"],
  "12th Commerce": ["Economics", "Accounting", "Business Studies"],
  "12th Humanities": ["History", "Psychology", "Political Science"],
  // Add similar for 11th and 10th.
};

router.get("/subjects/:course", (req, res) => {
  const { course } = req.params;
  const subjects = subjectsConfig[course];
  if (subjects) {
    res.status(200).json(subjects);
  } else {
    res.status(404).json({ message: "Invalid course." });
  }
});

module.exports = router;
